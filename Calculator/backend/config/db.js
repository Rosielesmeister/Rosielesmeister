const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use MONGODB_URI from .env, fallback to localhost if not set
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/calculator-app",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,   // (optional in modern mongoose versions)
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
