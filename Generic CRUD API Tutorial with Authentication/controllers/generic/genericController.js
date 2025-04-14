import mongoose from 'mongoose';
import GenericRepository from '../../repositories/generic/genericRepository.js';
import GenericService from '../../services/generic/genericService.js';

/**
 * Creates generic CRUD controller functions for a given Mongoose Model.
 * @param {mongoose.Model} Model - The Mongoose model to operate on.
 * @param {object} [options] - Configuration options.
 * @param {string[]} [options.excludedFields=['password', '__v']] - Fields to exclude from responses by default. Add other sensitive fields specific to models if needed.
 * @param {string[]} [options.readOnlyFields=['_id', 'createdAt', 'updatedAt']] - Fields that shouldn't be updatable via generic update.
 * @returns {object} Object containing generic controller functions.
 */
export const createGenericController = (Model, options = {}) => {
    const repository = new GenericRepository(Model); // Create an instance of the repository
    const service = new GenericService(repository); // Create an instance of the service

    // Default fields to exclude unless overridden
    const defaultExcluded = ['__v'];
    if (Model.schema.paths['password']) {
        defaultExcluded.push('password');
    }
    const excludedFields = options.excludedFields || defaultExcluded;
    const selectFieldsExcludedString = excludedFields.map(field => `-${field}`).join(' ');

    const defaultReadOnly = ['_id', 'createdAt', 'updatedAt'];
    if (Model.schema.paths['password']) {
        defaultReadOnly.push('password');
    }
    const readOnlyFields = options.readOnlyFields || defaultReadOnly;


    const create = async (req, res) => {
        try {
            const doc = await service.create(req.body); // Use the service
            const responseDoc = doc.toObject ? doc.toObject({ virtuals: true }) : { ...doc };
            excludedFields.forEach(field => delete responseDoc[field]);
            return res.status(201).json(responseDoc);
        } catch (error) {
            console.error(`Error creating ${Model.modelName}:`, error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message, details: error.errors });
            }
            if (error.code === 11000) {
                return res.status(409).json({ error: 'Duplicate key error.', details: error.keyValue });
            }
            return res.status(500).json({ error: `Failed to create ${Model.modelName}` });
        }
    };

    const getAll = async (req, res) => {
        try {
            // --- Filtering ---
            const queryObj = { ...req.query };
            const excludedQueryFields = ['page', 'sort', 'limit', 'fields'];
            excludedQueryFields.forEach(el => delete queryObj[el]);
            let query = {};
            try {
                let queryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
                query = JSON.parse(queryStr);
            } catch (parseError) {
                console.error("Error parsing query parameters:", parseError);
                return res.status(400).json({ error: "Invalid query parameters" });
            }

            // --- Sorting ---
            const sort = req.query.sort ? req.query.sort.split(',').join(' ') : '-createdAt';

            // --- Field Limiting ---
            let select = selectFieldsExcludedString;
            if (req.query.fields) {
                select = req.query.fields.split(',').join(' ');
                excludedFields.forEach(ex => {
                    if (!req.query.fields.includes(ex) && !req.query.fields.includes(`-${ex}`)) {
                        select += ` -${ex}`;
                    }
                });
            }

            // --- Pagination ---
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 100;
            const skip = (page - 1) * limit;

            // Use the service's findAll method
            const docs = await service.findAll(query, { sort, select, skip, limit });
            const totalDocuments = await service.count(query);

            return res.json({
                status: 'success',
                results: docs.length,
                totalDocuments: totalDocuments,
                currentPage: page,
                totalPages: Math.ceil(totalDocuments / limit),
                data: docs
            });

        } catch (error) {
            console.error(`Error getting all ${Model.modelName}s:`, error);
            return res.status(500).json({ status: 'error', error: `Failed to retrieve ${Model.modelName}s` });
        }
    };

    const getById = async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            let select = selectFieldsExcludedString;
            if (req.query.fields) {
                select = req.query.fields.split(',').join(' ');
                excludedFields.forEach(ex => {
                    if (!req.query.fields.includes(ex) && !req.query.fields.includes(`-${ex}`)) {
                        select += ` -${ex}`;
                    }
                });
            }

            const doc = await service.findById(id); // Use the service
            if (!doc) {
                return res.status(404).json({ message: `${Model.modelName} not found` });
            }
            const responseDoc = doc.toObject ? doc.toObject({ virtuals: true }) : { ...doc };
            excludedFields.forEach(field => delete responseDoc[field]);
            return res.json(responseDoc);
        } catch (error) {
            console.error(`Error getting ${Model.modelName} by ID:`, error);
            return res.status(500).json({ error: `Failed to retrieve ${Model.modelName}` });
        }
    };

    const update = async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const updateData = { ...req.body };
            readOnlyFields.forEach(field => delete updateData[field]);

            const updatedDoc = await service.update(id, updateData); // Use the service

            if (!updatedDoc) {
                return res.status(404).json({ message: `${Model.modelName} not found` });
            }
            const responseDoc = updatedDoc.toObject ? updatedDoc.toObject({ virtuals: true }) : { ...updatedDoc };
            excludedFields.forEach(field => delete responseDoc[field]);
            return res.json(responseDoc);
        } catch (error) {
            console.error(`Error updating ${Model.modelName}:`, error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message, details: error.errors });
            }
            if (error.code === 11000) {
                return res.status(409).json({ error: 'Duplicate key error during update.', details: error.keyValue });
            }
            return res.status(500).json({ error: `Failed to update ${Model.modelName}` });
        }
    };

    const deleteById = async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            const deletedDoc = await service.delete(id); // Use the service
            if (!deletedDoc) {
                return res.status(404).json({ message: `${Model.modelName} not found` });
            }
            return res.status(204).send();
        } catch (error) {
            console.error(`Error deleting ${Model.modelName}:`, error);
            return res.status(500).json({ error: `Failed to delete ${Model.modelName}` });
        }
    };

    return { create, getAll, getById, update, delete: deleteById };
};