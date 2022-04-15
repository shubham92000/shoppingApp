import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // throw new Error('some error');
  const products = await Product.find({});
  res.json(products);
});

// @desc    fetch single products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

// @desc    delete a product
// @route   DELETE /api/products/:id
// @access  Public Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

export { getProducts, getProductById, deleteProductById };
