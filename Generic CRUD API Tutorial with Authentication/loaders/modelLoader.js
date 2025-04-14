import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

export const loadModels = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const modelsPath = path.join(__dirname, '../models');

    const modelModules = {};
    const files = fs.readdirSync(modelsPath).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const modelName = path.basename(file, '.js'); // e.g., User, Event
        // Use dynamic import()
        const modulePath = path.join(modelsPath, file).replace(/\\/g, '/'); // Ensure forward slashes for URL
        try {
            // Dynamic import needs file URL path
            const module = await import(`file://${modulePath}`);
            if (module.default && module.default.modelName) { // Check if it's a mongoose model
                modelModules[modelName] = module.default;
                console.log(`Loaded model: ${modelName}`);
            }
        } catch (err) {
            console.error(`Failed to load model ${modelName} from ${modulePath}:`, err);
        }
    }
    return modelModules;
};