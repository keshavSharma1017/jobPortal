import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Retry connection
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;