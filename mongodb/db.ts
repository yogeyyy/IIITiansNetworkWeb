import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


dotenv.config();

const connectDB = async () => {
    if (mongoose.connection?.readyState >= 1) {
        console.log("Already connected to database");
        return;
    }

    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in the environment");
    }

    try {
        console.log("Connecting to database...");
        await mongoose.connect(uri);
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

export default connectDB;

//Ji8eqTbJjQaLb15e
// nainaniyogit