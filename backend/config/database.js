const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    const connUser = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB User Connected: ${connUser.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectDB: connectDB,
};
