import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
import { v2 as cloudinary } from "cloudinary";
import productModel from "./models/productModel.js";

dotenv.config();

try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  console.log("DNS setServers notice:", e.message);
}

// Configure Cloudinary using your .env credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const restoreAllImages = async () => {
  try {
    // 1. Connect to MongoDB
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas successfully!");

    console.log("Fetching all images from your Cloudinary account...");

    // 2. Fetch all image resources from Cloudinary (up to 100)
    const result = await cloudinary.api.resources({
      resource_type: "image",
      max_results: 100,
    });

    if (!result.resources || result.resources.length === 0) {
      console.log("No images found in your Cloudinary account!");
      process.exit(0);
    }

    // Filter to keep relevant fashion/ecommerce items (exclude non-store assets if needed)
    const storeImages = result.resources.filter(
      (file) => !file.public_id.includes("amharic_ocr")
    );

    const imagesToRestore = storeImages.length > 0 ? storeImages : result.resources;

    console.log(
      `Found ${imagesToRestore.length} store images. Clearing old database products...`
    );

    // 3. Clear existing products to prevent duplicates
    await productModel.deleteMany({});

    const categories = ["Men", "Women", "Kids"];
    const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

    // 4. Map every image into a product document
    const restoredProducts = imagesToRestore.map((file, index) => {
      const cleanName =
        file.public_id
          .split("/")
          .pop()
          .replaceAll("_", " ")
          .replaceAll("-", " ") || `Fashion Item ${index + 1}`;

      const assignedCategory = categories[index % categories.length];
      const assignedSubCategory = subCategories[index % subCategories.length];
      const isBestseller = index % 3 === 0;
      const prices = [1200, 1500, 1800, 2200, 2500, 3100, 4500];

      return {
        name:
          cleanName.length > 25
            ? `Premium ${assignedCategory} ${assignedSubCategory} ${index + 1}`
            : cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
        description: `High-quality ${assignedCategory.toLowerCase()} ${assignedSubCategory.toLowerCase()} crafted with premium fabric for all-day comfort and elegance.`,
        price: prices[index % prices.length],
        image: [file.secure_url],
        category: assignedCategory,
        subCategory: assignedSubCategory,
        sizes: ["S", "M", "L", "XL"],
        bestseller: isBestseller,
        date: Date.now() - index * 3600000,
      };
    });

    // 5. Insert all into MongoDB
    await productModel.insertMany(restoredProducts);
    console.log(
      `Successfully restored all ${restoredProducts.length} products into your MongoDB database!`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error during restoration:", error);
    process.exit(1);
  }
};

restoreAllImages();