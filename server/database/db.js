import mongoose from "mongoose";

const Connection = async () => {
    try {
        const URL = process.env.MONGO_URL;
        await mongoose.connect(URL);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Error while connecting with the database ", err.message);
    }
};

export default Connection;