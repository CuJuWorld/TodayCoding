// These lines import special tools (middlewares) that help secure your API.
import authMiddleware from '../middlewares/authMiddleware.js'; // Tool to check if someone is logged in.
import adminAuthMiddleware from '../middlewares/adminAuthMiddleware.js'; // Tool to check if someone is an admin.

// This is a list that tells our app how to create basic API routes for different data types (like User, Event, Customer).
export const crudApiConfigs = [
    {
        // Information for the 'User' data type.
        modelName: 'User', // The name of the data type (like a table name).
        path: '/users',    // The web address (URL path) for this data type's API.
        options: {
            // Extra settings for this API.
            middlewares: [authMiddleware], // Apply the 'login check' tool to all User API actions. So, you need to be logged in to use these.
            permissions: {
                // Who is allowed to do what with User data.
                create: ['admin'],       // Only 'admin' users can create new users.
                read: ['user', 'admin'], // Both regular 'user' and 'admin' can see all users.
                readOne: ['user', 'admin'], // Both can see details of a single user.
                update: ['user', 'admin'], // Both can change user information.
                delete: ['user', 'admin'], // Both can delete users.
            },
            ownerBasedAccess: {
                // Special rule for users to manage their own data.
                readOne: true,  // A logged-in user can see their own details.
                update: true,  // A logged-in user can change their own details.
                delete: true,  // A logged-in user can delete their own account.
            },
        },
    },
    {
        // Information for the 'Event' data type.
        modelName: 'Event',
        path: '/events',
        options: {
            middlewares: [authMiddleware, adminAuthMiddleware], // Apply both 'login check' and 'admin check' tools. Only logged-in admins can use these.
            permissions: {
                create: ['admin'],
                read: ['admin'],
                readOne: ['admin'],
                update: ['admin'],
                delete: ['admin'],
            },
        },
    },
    {
        // Information for the 'Customer' data type.
        modelName: 'Customer',
        path: '/customers',
        options: {
            middlewares: [authMiddleware], // Apply the 'login check' tool.
            permissions: {
                create: ['admin'],
                read: ['admin'],
                readOne: ['admin'],
                update: ['admin'],
                delete: ['admin'],
            },
        },
    },
    // Add more configurations here for other models
    // Example for a 'Comment' data type where anyone logged in can read comments:
    // { modelName: 'Comment', path: '/comments', options: { middlewares: [authMiddleware], permissions: { read: ['guest', 'user', 'admin'] } } },
];