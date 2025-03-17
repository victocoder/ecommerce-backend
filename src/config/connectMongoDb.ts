import mongoose from 'mongoose';

const connectMongoDb = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DATABASE_URI as string); // Ensure DATABASE_URI is a string
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
    }
};

export default connectMongoDb;