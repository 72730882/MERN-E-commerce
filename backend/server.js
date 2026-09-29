import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"; 
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express()
const port = process.env.PORT || 4000

// Initialize Cloudinary
connectCloudinary().catch(err => console.error("Cloudinary config error:", err));

// Middlewares
app.use(express.json())
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'token', 'Authorization']
}))

// Root health-check endpoint (Immediate response, never hangs or times out)
app.get('/', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(200).send(`API Working${isDbConnected ? ' (Database: Connected)' : ''}`)
})

// Database connection middleware for API routes
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database connection error in API route:", err.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failed. Please check MongoDB Atlas Network Access (0.0.0.0/0) and MONGODB_URI.",
      error: err.message
    });
  }
};

// API endpoints protected with ensureDB
app.use('/api/user', ensureDB, userRouter)
app.use('/api/product', ensureDB, productRouter)
app.use('/api/cart', ensureDB, cartRouter)
app.use('/api/order', ensureDB, orderRouter)

// Start server locally (on Vercel, the app is exported and handled as a serverless function)
if (!process.env.VERCEL) {
  connectDB().catch(e => console.error("Initial local DB connection:", e.message));
  app.listen(port, () => console.log('Server started on PORT: ' + port))
}

export default app;