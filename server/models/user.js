import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    recentViews: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;