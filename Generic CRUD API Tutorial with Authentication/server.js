import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './db.js';

// Import Routers/Factories
import { createApiRouter } from './routes/generic/genericRouter.js';
import userAuthRoutes from './routes/userAuthRoutes.js';

// Loaders
import { loadModels } from './loaders/modelLoader.js';

// Configurations
import { crudApiConfigs } from './config/apiRoutesConfig.js';

const startServer = async () => {
    const app = express();
    app.use(express.json());

    // Connect to Database
    await connectDB();

    // Load models dynamically
    const loadedModels = await loadModels();

    // --- API Routes ---

    // User Authentication
    app.use('/api/auth', userAuthRoutes);

    // Generic CRUD APIs
    console.log('Mounting generic CRUD routes...');
    crudApiConfigs.forEach(config => {
        const model = loadedModels[config.modelName];
        if (model) {
            const router = createApiRouter(model, config.options);
            app.use(`/api${config.path}`, router);
            console.log(`  Mounted ${config.modelName} CRUD at /api${config.path}`);
        } else {
            console.warn(`  Model ${config.modelName} defined in config but not found/loaded.`);
        }
    });
    console.log('Generic CRUD routes mounted.');

    // --- End API Routes ---

    // Basic Root Route
    app.get('/', (req, res) => {
        res.send('API is running...');
    });

    // Centralized Error Handling
    app.use((err, req, res, next) => {
        console.error("Unhandled Error:", err.stack || err);
        res.status(err.status || 500).json({
            status: 'error',
            message: err.message || 'Something went wrong!',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    });

    // Define Port
    const PORT = process.env.PORT || 3000;

    // Start Server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`API available at http://localhost:${PORT}`);
    });
};

startServer().catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});