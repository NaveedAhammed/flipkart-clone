import Product from "../models/product.js";
import User from "../models/user.js";

export const addProductToRecentViews = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.params.userId;
    try {
        const product = await Product.findById(productId);
        const user = await User.findById(userId);
        const exist = await User.findOne({ recentViews: productId });
        if (exist) {
            return;
        }
        if (product && user) {
            await User.findOneAndUpdate({ _id: userId }, { $push: { recentViews: productId } });
            console.log("Success");
        } else if (!product) {
            console.log("Product not found");
        } else {
            console.log("User not found");
        }
        return;
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}