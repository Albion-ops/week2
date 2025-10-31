const { UnauthorizedError } = require('../errors/customErrors');

module.exports = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) return next(new UnauthorizedError('Invalid or missing API key'));
  next();
};