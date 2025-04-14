import mongoose from 'mongoose'; // Import mongoose using ES Modules

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/db_20250408";
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message); // Log only the message for clarity
        process.exit(1);
    }
};

export default connectDB; // Export as default


