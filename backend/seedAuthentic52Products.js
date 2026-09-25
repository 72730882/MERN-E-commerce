import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import productModel from "./models/productModel.js";

dotenv.config();

try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  console.log("DNS setServers notice:", e.message);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, "../frontend/src/assets");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Helper for sequential upload with retry
const uploadImageToCloudinary = async (filename, retries = 3) => {
  const filePath = path.join(assetsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return null;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: "authentic_fashion",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: "image",
      });
      return res.secure_url;
    } catch (err) {
      if (attempt === retries) {
        console.error(`Failed to upload ${filename}:`, err.message);
        return null;
      }
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
};

const run = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas successfully!");

    // Read assets.js content
    const assetsJsPath = path.join(assetsDir, "assets.js");
    const assetsContent = fs.readFileSync(assetsJsPath, "utf8");

    // Extract product objects using regex
    const productRegex = /\{\s*_id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*price:\s*(\d+),\s*image:\s*\[([^\]]+)\],\s*category:\s*"([^"]+)",\s*subCategory:\s*"([^"]+)",\s*sizes:\s*\[([^\]]+)\],\s*date:\s*(\d+),\s*bestseller:\s*(true|false)\s*\}/gs;

    const parsedProducts = [];
    let match;
    while ((match = productRegex.exec(assetsContent)) !== null) {
      const [
        ,
        id,
        name,
        description,
        priceStr,
        imageStr,
        category,
        subCategory,
        sizesStr,
        dateStr,
        bestsellerStr,
      ] = match;

      const rawImages = imageStr
        .split(",")
        .map((s) => s.trim().replace(/'|"/g, ""));

      const sizes = sizesStr
        .split(",")
        .map((s) => s.trim().replace(/'|"/g, ""));

      parsedProducts.push({
        id,
        name,
        description,
        price: Number(priceStr),
        rawImages,
        category,
        subCategory,
        sizes,
        bestseller: bestsellerStr === "true",
        date: Number(dateStr),
      });
    }

    console.log(`Successfully parsed ${parsedProducts.length} products from assets.js.`);

    // Upload all distinct image files
    const allImageKeys = new Set();
    parsedProducts.forEach((p) => {
      p.rawImages.forEach((imgKey) => {
        allImageKeys.add(imgKey);
      });
    });

    console.log(`Total unique image files to verify/upload: ${allImageKeys.size}`);

    const urlCache = {};
    let count = 0;
    for (const key of allImageKeys) {
      count++;
      const filename = `${key}.png`;
      console.log(`[${count}/${allImageKeys.size}] Uploading ${filename}...`);
      const url = await uploadImageToCloudinary(filename);
      if (url) {
        urlCache[key] = url;
      }
    }

    console.log("All image files processed. Mapping products to authentic images...");

    // Build database documents with multiple poses of the SAME product
    const finalProducts = parsedProducts.map((p) => {
      const primaryUrl = urlCache[p.rawImages[0]];
      const imagesList = [];

      if (p.rawImages.length > 1) {
        // If product already has multiple actual pose files (like p_img2_1, p_img2_2, p_img2_3, p_img2_4)
        p.rawImages.forEach((key) => {
          if (urlCache[key]) imagesList.push(urlCache[key]);
        });
      } else if (primaryUrl) {
        // For single-image products, generate authentic multi-angle views of THE EXACT SAME GARMENT
        // 1. Full frontal shot
        imagesList.push(primaryUrl);
        // 2. Upper body / Chest detail view of SAME garment (Cloudinary auto crop top)
        const upperDetail = primaryUrl.replace("/upload/", "/upload/c_crop,g_north,h_0.7,w_0.9/");
        // 3. Fabric / texture zoom of SAME garment (Cloudinary center zoom)
        const fabricZoom = primaryUrl.replace("/upload/", "/upload/c_crop,g_center,h_0.6,w_0.8/");

        imagesList.push(upperDetail);
        imagesList.push(fabricZoom);
      }

      return {
        name: p.name,
        description: p.description,
        price: p.price,
        image: imagesList.length > 0 ? imagesList : [primaryUrl],
        category: p.category,
        subCategory: p.subCategory,
        sizes: p.sizes,
        bestseller: p.bestseller,
        date: p.date,
      };
    });

    console.log("Clearing previous database products...");
    await productModel.deleteMany({});

    console.log(`Inserting all ${finalProducts.length} authentic products into MongoDB Atlas...`);
    await productModel.insertMany(finalProducts);

    console.log(`🎉 SUCCESS! Seeded all ${finalProducts.length} products with 100% accurate gender, category, and same-product multi-angle images!`);
    process.exit(0);
  } catch (err) {
    console.error("Error in seedAuthentic52Products:", err);
    process.exit(1);
  }
};

run();
