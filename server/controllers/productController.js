import Product from '../models/product.js';

export const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}