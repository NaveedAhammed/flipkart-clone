import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    ratingsCount: {
        type: Number,
        required: true
    },
    reviewsCount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product;