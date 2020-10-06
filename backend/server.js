import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

// Error Handling imports
import { notFound, errorHandler } from './middleware/errors/errorMiddleware.js';

// DB import
import connectDB from './config/db.js';

// Route imports
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); // init .env variables
connectDB(); // connect to db
const app = express(); // express app

// body parser for passing json in the params body
app.use(express.json());

// API confirmation TODO: delete?
app.get('/', (req, res) => {
  res.send('API is up and running...');
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// define PORT and MODE variables
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

// begin listening for calls
app.listen(
  PORT,
  console.log(`Server running in ${MODE} mode on port ${PORT}`.yellow.bold)
);
