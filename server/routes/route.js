import express from 'express';
import { login, register } from '../controllers/authController.js';
import { createProduct, getProduct, getProducts } from '../controllers/productController.js';
import { paymentHandler } from '../controllers/stripeController.js';
import { addProductToRecentViews } from '../controllers/userController.js';
import { verifyAdmin, verifyToken } from '../middlewares/verify.js';

const router = express.Router();

// authentication routes
router.post('/signup', register);
router.post('/signin', login);

// user routes
router.post('/recentViews/:userId/:productId', verifyToken, addProductToRecentViews);

// product routes
router.post('/productCreate', verifyAdmin, createProduct);
router.get('/getProducts', getProducts);
router.get('/products/:productId', getProduct);

// payment routes
router.post('/payment', paymentHandler);

export default router;