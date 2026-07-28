import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import productModel from "./models/productModel.js";

dotenv.config();

// Configure Cloudinary using your .env credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const restoreAllImages = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    console.log("Fetching all images from your Cloudinary account...");

    // 2. Fetch all image resources from Cloudinary (up to 100)
    const result = await cloudinary.api.resources({
      resource_type: "image",
      max_results: 100
    });

    if (!result.resources || result.resources.length === 0) {
      console.log("No images found in your Cloudinary account!");
      process.exit(0);
    }

    console.log(`Found ${result.resources.length} total images. Clearing old database products...`);

    // 3. Clear existing products to prevent duplicates
    await productModel.deleteMany({});

    // 4. Map every image into a product document
    const restoredProducts = result.resources.map((file, index) => {
      // Create a clean name from the image file name
      const cleanName = file.public_id.split('/').pop().replaceAll('_', ' ').replaceAll('-', ' ');

      return {
        name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1) || `Product ${index + 1}`,
        description: "Restored from your Cloudinary media library.",
        price: 1500, // Default price you can change later in admin
        image: [file.secure_url], // Your real Cloudinary image link
        category: "General",
        subCategory: "Default",
        sizes: ["S", "M", "L"],
        bestseller: false,
        date: Date.now()
      };
    });

    // 5. Insert all into MongoDB
    await productModel.insertMany(restoredProducts);
    console.log(`Successfully restored all ${restoredProducts.length} images into your new MongoDB database!`);

    process.exit();
  } catch (error) {
    console.error("Error during full restoration:", error);
    process.exit(1);
  }
};

restoreAllImages();