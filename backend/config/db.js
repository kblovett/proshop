import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    const dbName = conn.connection.name;
    console.log(`DB connected: ${dbName}`.cyan.underline);
  } catch (err) {
    console.error(`ERROR: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
