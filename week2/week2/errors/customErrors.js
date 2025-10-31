class AppError extends Error { constructor(msg, status) { super(msg); this.status = status; } }
class NotFoundError extends AppError { constructor(msg) { super(msg || 'Not Found', 404); } }
class ValidationError extends AppError { constructor(msg) { super(msg || 'Validation Error', 400); } }
class UnauthorizedError extends AppError { constructor(msg) { super(msg || 'Unauthorized', 401); } }
module.exports = { AppError, NotFoundError, ValidationError, UnauthorizedError };