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

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const sampleCatalog = [
  {
    name: "Women Floral Embroidered Round Neck Cotton Top",
    category: "Women",
    subCategory: "Topwear",
    price: 650,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "An elegant, breathable cotton top featuring subtle embroidery, relaxed fit, and ultra-soft fabric suitable for both casual outings and daily wear."
  },
  {
    name: "Men Premium Slim-Fit Cotton T-Shirt",
    category: "Men",
    subCategory: "Topwear",
    price: 750,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    description: "Crafted from 100% combed cotton, this crew-neck t-shirt offers exceptional softness, durability, and a clean modern silhouette."
  },
  {
    name: "Girls Cute Round Neck Printed Cotton Top",
    category: "Kids",
    subCategory: "Topwear",
    price: 450,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Soft, vibrant, and gentle on sensitive skin. Perfect for playful days, parties, and everyday comfort."
  },
  {
    name: "Men Tailored Flat-Front Stretch Chino Trousers",
    category: "Men",
    subCategory: "Bottomwear",
    price: 1250,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    description: "Modern tapered trousers made with flexible stretch cotton for unrestricted movement and sharp all-day styling."
  },
  {
    name: "Women High-Waist Wide-Leg Casual Pants",
    category: "Women",
    subCategory: "Bottomwear",
    price: 1100,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "Flowy, flattering silhouette with elasticated waistband and side pockets. Pairs beautifully with tees or button-downs."
  },
  {
    name: "Boys Casual Graphic Pure Cotton T-Shirt",
    category: "Kids",
    subCategory: "Topwear",
    price: 480,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "Durable reinforced stitching and fun contemporary print that retains its color wash after wash."
  },
  {
    name: "Men Urban Classic Heavyweight Pullover Hoodie",
    category: "Men",
    subCategory: "Winterwear",
    price: 1850,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    description: "Cozy fleece-lined hoodie with adjustable drawstring hood, kangaroo pocket, and ribbed hem for extra warmth."
  },
  {
    name: "Women Oversized Knit Winter Cardigan",
    category: "Women",
    subCategory: "Winterwear",
    price: 1950,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Chunky textured knit cardigan with front button closure. Warm, versatile, and effortlessly chic."
  },
  {
    name: "Kids Warm Sherpa-Lined Zip Jacket",
    category: "Kids",
    subCategory: "Winterwear",
    price: 1350,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Insulated winter jacket with soft sherpa lining to keep your little ones cozy during chilly weather."
  },
  {
    name: "Men Slim-Fit Vintage Wash Denim Jeans",
    category: "Men",
    subCategory: "Bottomwear",
    price: 1600,
    sizes: ["M", "L", "XL"],
    bestseller: true,
    description: "Authentic 5-pocket denim styling with comfort stretch and clean vintage wash."
  },
  {
    name: "Women Elegant Solid Rayon Long Kurti Top",
    category: "Women",
    subCategory: "Topwear",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Lightweight rayon fabric that drapes gracefully. Features side slits and three-quarter sleeves."
  },
  {
    name: "Boys Relaxed-Fit Cargo Joggers",
    category: "Kids",
    subCategory: "Bottomwear",
    price: 750,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Sturdy cotton twill cargo pants featuring multiple functional pockets and elastic ankle cuffs."
  },
  {
    name: "Women Casual Relaxed Crop Hoodie",
    category: "Women",
    subCategory: "Winterwear",
    price: 1450,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Trendy cropped fleece hoodie with dropped shoulders and ribbed cuffs. Soft and comfortable."
  },
  {
    name: "Men Classic Button-Down Oxford Shirt",
    category: "Men",
    subCategory: "Topwear",
    price: 1350,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: false,
    description: "Timeless Oxford weave cotton shirt with a button-down collar and chest pocket. Ideal for office or weekend wear."
  },
  {
    name: "Girls Tiered Cotton Summer Dress",
    category: "Kids",
    subCategory: "Topwear",
    price: 820,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Lightweight tiered twirl dress crafted in breathable cotton with vibrant pastel hues."
  },
  {
    name: "Women Straight-Cut Formal Trousers",
    category: "Women",
    subCategory: "Bottomwear",
    price: 1280,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Sleek tailored trousers with front pleats, hidden hook closure, and ankle-length cut."
  },
  {
    name: "Men Lightweight Windbreaker Jacket",
    category: "Men",
    subCategory: "Winterwear",
    price: 1750,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    description: "Water-resistant, packable windbreaker jacket with zip front and breathable mesh lining."
  },
  {
    name: "Kids Unisex Thermal Sweatpants",
    category: "Kids",
    subCategory: "Bottomwear",
    price: 580,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Fleece-brushed inner lining for extra warmth, with stretchy drawstring waistband."
  }
];

const seedClothingStore = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas successfully!");

    // Upload local assets (p_img*.png) to Cloudinary
    console.log("Reading local clothing assets from frontend/src/assets...");
    const files = fs.readdirSync(assetsDir).filter(f => f.startsWith("p_img") && f.endsWith(".png"));
    console.log(`Found ${files.length} local clothing image files.`);

    const uploadedUrls = [];

    // Helper with retry
    const uploadWithRetry = async (filePath, retries = 3) => {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const res = await cloudinary.uploader.upload(filePath, {
            folder: "fashion_collection",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: "image",
          });
          return res.secure_url;
        } catch (err) {
          if (attempt === retries) throw err;
          console.log(`Retrying upload for ${path.basename(filePath)} (attempt ${attempt + 1})...`);
          await new Promise((r) => setTimeout(r, 1500));
        }
      }
    };

    // Upload sequentially to avoid ECONNRESET
    for (let i = 0; i < Math.min(files.length, 30); i++) {
      const file = files[i];
      const filePath = path.join(assetsDir, file);
      try {
        const url = await uploadWithRetry(filePath);
        uploadedUrls.push(url);
        console.log(`Uploaded (${i + 1}/${Math.min(files.length, 30)}): ${file}`);
      } catch (err) {
        console.log(`Skipped ${file} after error: ${err.message}`);
      }
    }

    if (uploadedUrls.length === 0) {
      throw new Error("No images were uploaded to Cloudinary.");
    }

    console.log(`All ${uploadedUrls.length} clothing images uploaded to Cloudinary successfully!`);

    // Clear old products
    console.log("Clearing old products from database...");
    await productModel.deleteMany({});

    // Create rich products with 3 to 4 images per product!
    const productsToInsert = sampleCatalog.map((item, idx) => {
      // Pick 3 to 4 images for this product from the uploadedUrls pool
      const numImages = idx % 2 === 0 ? 4 : 3;
      const productImages = [];
      for (let j = 0; j < numImages; j++) {
        const imageIndex = (idx * 2 + j) % uploadedUrls.length;
        productImages.push(uploadedUrls[imageIndex]);
      }

      return {
        name: item.name,
        description: item.description,
        price: item.price,
        image: productImages, // Array of 3 to 4 high-res image URLs!
        category: item.category,
        subCategory: item.subCategory,
        sizes: item.sizes,
        bestseller: item.bestseller,
        date: Date.now() - idx * 86400000,
      };
    });

    await productModel.insertMany(productsToInsert);
    console.log(
      `🎉 Successfully seeded ${productsToInsert.length} fashion products with 3-4 images each into MongoDB Atlas!`
    );

    process.exit(0);
  } catch (error) {
    console.error("Error during clothing seed:", error);
    process.exit(1);
  }
};

seedClothingStore();
