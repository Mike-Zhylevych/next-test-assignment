/**
 * List of public routes (without authentication)
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * List of routes for user authentication
 * the authentification user will be redirected to the default redirect route
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * Api authentication routes prefix
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect route for authenticated users
 * @type {string}
 */
export const DEFAULT_LOGGED_IN_REDIRECT = "/dashboard";
