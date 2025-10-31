const express = require('express');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('../utils/asyncHandler');
const auth = require('../middleware/auth');
const { validateProduct, validatePartialProduct } = require('../middleware/validate');
const { NotFoundError } = require('../errors/customErrors');

const router = express.Router();

let products = [];

router.get('/', asyncHandler(async (req, res) => {
  let { category, page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  let filtered = products;
  if (category) filtered = filtered.filter(p => p.category === category);
  const start = (page - 1) * limit;
  const end = start + limit;
  res.json({ page, limit, total: filtered.length, data: filtered.slice(start, end) });
}));

router.get('/search', asyncHandler(async (req, res) => {
  const q = req.query.q || '';
  const results = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  res.json({ total: results.length, data: results });
}));

router.get('/stats', asyncHandler(async (req, res) => {
  const counts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ total: products.length, counts });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
}));

router.post('/', auth, validateProduct, asyncHandler(async (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
}));

router.put('/:id', auth, validatePartialProduct, asyncHandler(async (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) throw new NotFoundError('Product not found');
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
}));

router.delete('/:id', auth, asyncHandler(async (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) throw new NotFoundError('Product not found');
  const deleted = products.splice(idx, 1);
  res.json({ message: 'Deleted', product: deleted[0] });
}));

module.exports = router;