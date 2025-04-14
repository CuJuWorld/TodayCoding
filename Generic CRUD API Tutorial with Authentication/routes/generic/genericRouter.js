// routes/genericRouter.js
import express from 'express';
import { createGenericController } from '../../controllers/generic/genericController.js';
import roleBasedAuthMiddleware from '../../middlewares/roleBasedAuthMiddleware.js';

const checkOwnership = (modelName, operation) => async (req, res, next) => {
    if (
        modelName === 'User' &&
        req.options.ownerBasedAccess &&
        req.options.ownerBasedAccess[operation] &&
        req.user &&
        req.user.id.toString() === req.params.id
    ) {
        return next();
    }
    next();
};

export const createApiRouter = (model, options = {}) => {
    const router = express.Router();
    const controller = createGenericController(model);
    const middlewares = options.middlewares || [];
    const permissions = options.permissions || {};

    const applyMiddlewares = (routeMiddlewares) => {
        return [...middlewares, ...routeMiddlewares];
    };

    // Set options in request for middleware access
    router.use((req, res, next) => {
        req.options = options;
        next();
    });

    // Create
    router.post('/', applyMiddlewares([
        roleBasedAuthMiddleware(permissions.create || [])
    ]), controller.create);

    // Read All
    router.get('/', applyMiddlewares([
        roleBasedAuthMiddleware(permissions.read || [])
    ]), controller.getAll);

    // Read By ID
    router.get('/:id', applyMiddlewares([
        roleBasedAuthMiddleware(permissions.readOne || []),
        checkOwnership(options.modelName, 'readOne')
    ]), controller.getById);

    // Update By ID
    router.put('/:id', applyMiddlewares([
        roleBasedAuthMiddleware(permissions.update || []),
        checkOwnership(options.modelName, 'update')
    ]), controller.update);

    // Delete By ID
    router.delete('/:id', applyMiddlewares([
        roleBasedAuthMiddleware(permissions.delete || []),
        checkOwnership(options.modelName, 'delete')
    ]), controller.delete);

    return router;
};