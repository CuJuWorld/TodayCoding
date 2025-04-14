import mongoose from 'mongoose';

/**
 * A generic repository class to handle basic CRUD operations for any Mongoose model.
 */
class GenericRepository {
    constructor(model) {
        this.Model = model; // Store the Mongoose model
    }

    /**
     * Creates a new document in the database.
     * @param {object} data - The data for the new document.
     * @returns {Promise<mongoose.Document>} The newly created document.
     */
    async create(data) {
        try {
            return await this.Model.create(data);
        } catch (error) {
            console.error(`Error creating ${this.Model.modelName}:`, error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }

    /**
     * Finds a document by its ID.
     * @param {mongoose.Types.ObjectId|string} id - The ID of the document to find.
     * @returns {Promise<mongoose.Document|null>} The found document or null if not found.
     */
    async findById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null; // Or throw an error if you prefer
            }
            return await this.Model.findById(id);
        } catch (error) {
            console.error(`Error finding ${this.Model.modelName} by ID:`, error);
            throw error;
        }
    }

    /**
     * Finds all documents that match the given query.
     * @param {object} [query={}] - An optional query object to filter the results.
     * @param {object} [options={}] - Optional query options (e.g., sort, select, populate, pagination).
     * @returns {Promise<mongoose.Document[]>} An array of documents that match the query.
     */
    async findAll(query = {}, options = {}) {
        try {
            let dbQuery = this.Model.find(query);

            if (options.sort) {
                dbQuery = dbQuery.sort(options.sort);
            }
            if (options.select) {
                dbQuery = dbQuery.select(options.select);
            }
            if (options.populate) {
                dbQuery = dbQuery.populate(options.populate);
            }
            if (options.skip) {
                dbQuery = dbQuery.skip(options.skip);
            }
            if (options.limit) {
                dbQuery = dbQuery.limit(options.limit);
            }

            return await dbQuery;
        } catch (error) {
            console.error(`Error finding all ${this.Model.modelName}s:`, error);
            throw error;
        }
    }

    /**
     * Updates a document by its ID with the provided data.
     * @param {mongoose.Types.ObjectId|string} id - The ID of the document to update.
     * @param {object} data - The data to update the document with.
     * @param {object} [options={}] - Optional options for the update operation (e.g., new: true to return the modified document).
     * @returns {Promise<mongoose.Document|null>} The updated document or null if not found.
     */
    async update(id, data, options = { new: true, runValidators: true }) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null; // Or throw an error
            }
            return await this.Model.findByIdAndUpdate(id, data, options);
        } catch (error) {
            console.error(`Error updating ${this.Model.modelName}:`, error);
            throw error;
        }
    }

    /**
     * Deletes a document by its ID.
     * @param {mongoose.Types.ObjectId|string} id - The ID of the document to delete.
     * @returns {Promise<mongoose.Document|null>} The deleted document or null if not found.
     */
    async delete(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null; // Or throw an error
            }
            return await this.Model.findByIdAndDelete(id);
        } catch (error) {
            console.error(`Error deleting ${this.Model.modelName}:`, error);
            throw error;
        }
    }

    /**
     * Counts the number of documents that match the given query.
     * @param {object} [query={}] - An optional query object to filter the count.
     * @returns {Promise<number>} The number of documents that match the query.
     */
    async count(query = {}) {
        try {
            return await this.Model.countDocuments(query);
        } catch (error) {
            console.error(`Error counting documents for ${this.Model.modelName}:`, error);
            throw error;
        }
    }
}

export default GenericRepository;