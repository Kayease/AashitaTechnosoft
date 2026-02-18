/**
 * Utility functions for the Aashita.ai API
 */

/**
 * Async handler wrapper to avoid try-catch in every controller
 * @param {Function} fn - Async function to wrap
 */
exports.asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Send success response
 */
exports.sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data,
    });
};

/**
 * Send error response
 */
exports.sendError = (res, message, statusCode = 400) => {
    res.status(statusCode).json({
        success: false,
        message,
    });
};
