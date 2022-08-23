import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, email } = req.body;
        const inputPassword = req.body.password;
        const existUser = await User.findOne({ username: username });
        if (existUser) {
            return res.status(401).json({ message: "Username already exist" });
        }

        const existEmail = await User.findOne({ email: email });

        if (existEmail) {
            return res.status(401).json({ message: "Email already exist" });
        }

        const hashedPassword = await bcrypt.hash(inputPassword, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        const { __v, isAdmin, _id, createdAt, updatedAt, password, ...others } = newUser._doc;
        const accessToken = jwt.sign(
            {
                id: _id,
                isAdmin: isAdmin,
            },
            process.env.SECRET_KEY
        );
        res.status(200).json({ _id, ...others, accessToken });
    } catch (err) {
        res.status(401).json({ message: "Something went wrong, Try again later" });
    }
};

export const login = async (req, res) => {
    try {
        const { username } = req.body;
        const inputPassword = req.body.password;
        const existUser = await User.findOne({ username: username });
        if (!existUser) {
            return res.status(404).json({ message: "Username doesn't exist" });
        }

        const matchPassword = await bcrypt.compare(inputPassword, existUser.password);

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const { __v, isAdmin, _id, createdAt, updatedAt, password, ...others } = existUser._doc;
        const accessToken = jwt.sign(
            {
                id: _id,
                isAdmin: isAdmin,
            },
            process.env.SECRET_KEY
        );
        res.status(200).json({ _id, ...others, accessToken });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};