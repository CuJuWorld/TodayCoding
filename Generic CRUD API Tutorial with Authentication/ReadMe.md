## How to Start the Project:

1.  **Start MongoDB:** Ensure your MongoDB server is running at `mongodb://localhost:27017`.
2.  **Install Dependencies:**
    * Open your terminal in the project's root folder.
    * Run: `npm install`
3.  **Run the Server:**
    * In the same terminal, run: `node server.js`
4.  **Import Postman:**
    * Open Postman.
    * Import the collection from `/postman/collection.json`.
    * Import the environment from `/postman/env.json`.
5.  **Select Environment:** In Postman, choose the imported environment (e.g., "Teaching Project Environment").
6.  **Test APIs:**
    * **Register:** Test the "Register User" API in the "User Authentication API" folder to create users with `role: "user"` and `role: "admin"`.
    * **Login:** Test the "Login User" API in the same folder with the created credentials. Successful login will automatically update the `user_token` or `admin_token` in your Postman environment.
    * **Other APIs:** Explore other API requests in the Postman collection. For requests requiring an ID (e.g., user, event, customer), you'll need to replace the placeholder IDs (`{{user_id}}`, etc.) with actual IDs from your database. Ensure you have the correct token (`{{user_token}}` or `{{admin_token}}`) in the "Authorization" header for protected routes.
    

# Below is the folder structure with Generic CRUD APIs:
├── config
│   └── apiRoutesConfig.js         # Configuration for generic CRUD API routes (e.g., which models to expose).
├── controllers
│   ├── generic
│   │   └── genericController.js   # Reusable controller logic for basic CRUD operations on any model.
│   └── userAuthController.js      # Controller logic specific to user authentication (register, login, etc.).
│   ├── loaders
│   │   └── modelLoader.js         # Script to dynamically load Mongoose models from the 'models' directory.
│   ├── middlewares
│   │   ├── adminAuthMiddleware.js # Middleware to check if a user has admin privileges.
│   │   ├── authMiddleware.js      # Middleware to handle general user authentication (e.g., verifying tokens).
│   │   └── roleBasedAuthMiddleware.js # Middleware to implement role-based access control.
│   └── models
│       ├── Customer.js            # Mongoose schema definition for the Customer model.
│       ├── Event.js               # Mongoose schema definition for the Event model.
│       └── User.js                # Mongoose schema definition for the User model.
├── node_modules                 # Directory containing all installed npm packages (dependencies). (Usually hidden in explanations)
├── postman
│   ├── collection.json          # Postman collection file for testing the API endpoints.
│   └── env.json                 # Postman environment variables (e.g., base URL, tokens).
├── repositories
│   └── generic
│   │   └── genericRepository.js   # Reusable repository class for basic CRUD operations on any model.
│   └── userRepository.js        # Repository logic specific to the User model (potentially extending the generic repository).
├── routes
│   ├── generic
│   │   ├── genericRouter.js       # Creates generic API routes (e.g., /api/users, /api/events) for models.
│   │   └── userAuthRoutes.js      # Defines routes specifically for user authentication (/api/auth/register, /api/auth/login, etc.).
│   └── services
│       ├── generic
│       │   └── genericService.js    # Reusable service logic that might be used by generic controllers.
│       └── userService.js         # Service logic specific to the User model.
├── .env                         # File to store environment variables (e.g., database connection strings).
├── db.js                        # Script to connect to the database (likely MongoDB using Mongoose).
├── env.json                     # Another potential configuration file for environment-specific settings.
├── package-lock.json            # Records the exact versions of dependencies used in the project.
├── package.json                 # Contains project metadata, scripts, and dependencies.
├── README.md                    # Provides a description of the project and instructions.
└── server.js                    # The main entry point of the application, initializes the Express server and sets up routes.

**Explanation:**

* **`config`**: Contains configuration files for the application.
* **`controllers`**: Handles the application's logic for processing incoming requests and sending responses. It's further organized:
    * **`generic`**: Contains reusable controllers for common tasks.
    * **`loaders`**: Contains scripts to load parts of the application.
    * **`middlewares`**: Contains functions that run during the request-response cycle, often used for authentication and authorization.
    * **`models`**: Defines the structure and behavior of the data used in the application using Mongoose schemas.
* **`node_modules`**: Stores the external libraries (dependencies) installed by npm.
* **`postman`**: Contains files related to Postman, a tool for API testing.
* **`repositories`**: Implements the repository pattern to abstract the data access layer from the rest of the application.
* **`routes`**: Defines the API endpoints (URLs) and connects them to the appropriate controller functions. It's also organized:
    * **`generic`**: Contains routes that are automatically generated for different models.
* **`services`**: Contains business logic that is separate from the controllers and data access.
* **`.env`**: Stores sensitive configuration variables.
* **`db.js`**: Handles the connection to the database.
* **`env.json`**: Another configuration file.
* **`package-lock.json`** and **`package.json`**: Manage the project's dependencies.
* **`README.md`**: Provides information about the project.
* **`server.js`**: The main file to start the application.
* **`Teaching Project API.postman_collection.json`**: A file that can be imported into Postman to easily test the API endpoints.