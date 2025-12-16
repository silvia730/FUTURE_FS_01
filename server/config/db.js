const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check if MONGO_URI is defined
        if (!process.env.MONGO_URI) {
            console.error('❌ MONGO_URI environment variable is not defined!');
            console.error('Please set MONGO_URI in your environment variables.');
            process.exit(1);
        }

        console.log('🔄 Connecting to MongoDB...');
        console.log('Using MONGO_URI:', process.env.MONGO_URI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials in logs

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Mongoose 6+ doesn't need useNewUrlParser and useUnifiedTopology
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error('Full error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
