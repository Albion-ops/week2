const { ValidationError } = require('../errors/customErrors');

function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !category || typeof price !== 'number' || typeof inStock !== 'boolean') {
    return next(new ValidationError('Invalid product fields'));
  }
  next();
}

function validatePartialProduct(req, res, next) {
  next();
}

module.exports = { validateProduct, validatePartialProduct };