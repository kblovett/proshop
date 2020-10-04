import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// datasets
import users from './data/users.js';
import products from './data/products.js';
// import orders from './data/oders.js';

// Models
import User from './data/models/userModel.js';
import Product from './data/models/productModel.js';
import Order from './data/models/orderModel.js';

// DB
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProducts);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed!'.yellow.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

// export { importData, destroyData };
