import mongoose from 'mongoose';

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@iiitiansnetworkcluster.mbmoi3q.mongodb.net/?retryWrites=true&w=majority&appName=IIITiansNetworkCluster`;

if (!connectionString) {
  throw new Error("Please provide a valid connection string");
}

const connectDB = async () => {
    if (mongoose.connection?.readyState >= 1) {
        // console.log("Already connected to database");
        return;
    }

    try {
        console.log("Connecting to database...");
        await mongoose.connect(connectionString);
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

