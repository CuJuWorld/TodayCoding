/**
 * Middleware to check if the authenticated user's role is within the list of allowed roles.
 * @param {string[]} allowedRoles - An array of strings representing the roles allowed to access this route.
 * Options:
 * - `undefined`: If no roles are specified in the configuration, defaults to an empty array, allowing access.
 * - `null`: If explicitly set to null in the configuration, defaults to an empty array, allowing access.
 * - `[]` (Empty array): Explicitly allows access to any authenticated user (or based on preceding middlewares).
 * - `['admin']`: Allows access only to users with the 'admin' role.
 * - `['user', 'admin']`: Allows access to users with either the 'user' or 'admin' role.
 * - And so on, for any combination of role strings.
 * @returns {function} An Express middleware function.
 */
const roleBasedAuthMiddleware = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles || allowedRoles.length === 0) {
        return next(); // If no roles specified, allow access (or adjust as needed)
    }
    if (req.user && req.user.role && allowedRoles.includes(req.user.role)) {
        next();
    } else {
        return res.status(403).json({ message: 'Not authorized, role not permitted' });
    }
};

export default roleBasedAuthMiddleware;