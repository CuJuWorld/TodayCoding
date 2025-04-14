/**
 * A generic service class to handle business logic for a given repository.
 */
class GenericService {
    constructor(repository) {
        this.repository = repository; // Store the generic repository instance
    }

    /**
     * Creates a new document.
     * @param {object} data - The data for the new document.
     * @returns {Promise<mongoose.Document>} The newly created document.
     */
    async create(data) {
        return this.repository.create(data);
    }

    /**
     * Finds a document by its ID.
     * @param {mongoose.Types.ObjectId|string} id - The ID of the document to find.
     * @returns {Promise<mongoose.Document|null>} The found document or null if not found.
     */
    async findById(id) {
        return this.repository.findById(id);
    }

    /**
     * Finds all documents that match the given query.
     * @param {object} [query={}] - An optional query object to filter the results.
     * @param {object} [options={}] - Optional query options (e.g., sort, select, populate, pagination).
     * @returns {Promise<mongoose.Document[]>} An array of documents that match the query.
     */
    async findAll(query = {}, options = {}) {
        return this.repository.findAll(query, options);
    }

    /**
     * Updates a document by its ID with the provided data.
     * @param {mongoose.Types.ObjectId|string} id - The ID of the document to update.
     * @param {object} data - The data to update the document with.
     * @param {object} [options={}] - Optional options for the update operation.
     * @returns {Promise<mongoose.Document|null>} The updated document or null if not found.
     */
    async update(id, data, options) {
        return this.repository.update(id, data, options);
    }

    /**
     * Deletes a document by its ID.
     * @param {mongoose.Types.ObjectId|string} id - The ID of the document to delete.
     * @returns {Promise<mongoose.Document|null>} The deleted document or null if not found.
     */
    async delete(id) {
        return this.repository.delete(id);
    }

    /**
     * Counts the number of documents that match the given query.
     * @param {object} [query={}] - An optional query object to filter the count.
     * @returns {Promise<number>} The number of documents that match the query.
     */
    async count(query = {}) {
        return this.repository.count(query);
    }
}

export default GenericService;