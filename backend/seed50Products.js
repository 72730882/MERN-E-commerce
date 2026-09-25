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

const products50 = [
  // ==================== WOMEN ====================
  // Topwear
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
    name: "Women Classic Button-Down White Silk Shirt",
    category: "Women",
    subCategory: "Topwear",
    price: 950,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "Luxurious pure silk-blend shirt with a crisp collar, smooth mother-of-pearl buttons, and tailored silhouette for work or evening wear."
  },
  {
    name: "Women Casual Ribbed Knit Sleeveless Crop Top",
    category: "Women",
    subCategory: "Topwear",
    price: 420,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Form-fitting ribbed crop top with high stretch fabric and scoop neckline. Perfect for summer layering."
  },
  {
    name: "Women Elegant Solid Rayon Long Kurti Top",
    category: "Women",
    subCategory: "Topwear",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Lightweight rayon fabric that drapes gracefully. Features side slits and three-quarter sleeves with fine contrast piping."
  },
  {
    name: "Women Bohemian Print V-Neck Linen Blouse",
    category: "Women",
    subCategory: "Topwear",
    price: 780,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "Airy pure linen blouse with artisan floral prints, relaxed batwing sleeves, and effortless bohemian charm."
  },
  {
    name: "Women Striped Cotton Regular-Fit Casual Tee",
    category: "Women",
    subCategory: "Topwear",
    price: 490,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Timeless nautical striped tee made from 100% organic combed cotton with double-stitched hem."
  },
  // Bottomwear
  {
    name: "Women High-Waist Wide-Leg Flowy Linen Pants",
    category: "Women",
    subCategory: "Bottomwear",
    price: 1100,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "Flowy, flattering silhouette with elasticated waistband and deep side pockets. Pairs beautifully with tees or button-downs."
  },
  {
    name: "Women Straight-Cut Tailored Formal Trousers",
    category: "Women",
    subCategory: "Bottomwear",
    price: 1280,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Sleek tailored trousers with front pleats, hidden hook closure, and ankle-length cut for an effortlessly sharp look."
  },
  {
    name: "Women High-Rise Vintage Skinny Fit Jeans",
    category: "Women",
    subCategory: "Bottomwear",
    price: 1450,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "Premium stretch denim that shapes and contours gracefully. Features 5-pocket styling and antique brass hardware."
  },
  {
    name: "Women Pleated A-Line Flowy Midi Skirt",
    category: "Women",
    subCategory: "Bottomwear",
    price: 980,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Sophisticated sunburst accordion pleats with a soft elastic waistband and smooth inner lining."
  },
  {
    name: "Women Stretch Cotton Cargo Joggers",
    category: "Women",
    subCategory: "Bottomwear",
    price: 1150,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Urban utility meets casual comfort with multi-pocket cargo detailing and ribbed ankle cuffs."
  },
  // Winterwear
  {
    name: "Women Oversized Chunky Knit Winter Cardigan",
    category: "Women",
    subCategory: "Winterwear",
    price: 1950,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Chunky textured cable knit cardigan with front tortoiseshell button closure. Warm, versatile, and effortlessly chic."
  },
  {
    name: "Women Casual Relaxed Crop Fleece Hoodie",
    category: "Women",
    subCategory: "Winterwear",
    price: 1450,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Trendy cropped fleece hoodie with dropped shoulders and ribbed cuffs. Ultra-soft interior for maximum warmth."
  },
  {
    name: "Women Longline Wool-Blend Trench Overcoat",
    category: "Women",
    subCategory: "Winterwear",
    price: 3200,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "Structured wool-blend overcoat with double-breasted button front, tie belt, and wide notch lapels."
  },
  {
    name: "Women Quilted Lightweight Down Puffer Jacket",
    category: "Women",
    subCategory: "Winterwear",
    price: 2400,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Packable insulated puffer jacket with water-resistant shell, high stand collar, and zipper hand pockets."
  },
  {
    name: "Women Cable-Knit Turtleneck Thermal Sweater",
    category: "Women",
    subCategory: "Winterwear",
    price: 1650,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Cozy high-neck turtleneck sweater featuring authentic diamond cable knit patterns and ribbed trims."
  },

  // ==================== MEN ====================
  // Topwear
  {
    name: "Men Premium Slim-Fit Crew Neck Cotton T-Shirt",
    category: "Men",
    subCategory: "Topwear",
    price: 750,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    description: "Crafted from 100% combed cotton, this crew-neck t-shirt offers exceptional softness, durability, and a clean modern silhouette."
  },
  {
    name: "Men Classic Button-Down Oxford Dress Shirt",
    category: "Men",
    subCategory: "Topwear",
    price: 1350,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: false,
    description: "Timeless Oxford weave cotton shirt with a button-down collar and chest pocket. Ideal for office or weekend smart-casual wear."
  },
  {
    name: "Men Pure Cotton Pique Polo Shirt with Contrast Collar",
    category: "Men",
    subCategory: "Topwear",
    price: 920,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    description: "Breathable honeycomb pique fabric with ribbed collar, 3-button placket, and subtle embroidered chest accent."
  },
  {
    name: "Men Casual Slub Jersey Long Sleeve Henley",
    category: "Men",
    subCategory: "Topwear",
    price: 850,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    description: "Textured slub jersey cotton shirt with a classic 4-button henley neckline and comfortable ribbed cuffs."
  },
  {
    name: "Men Vintage Graphic Oversized Streetwear Tee",
    category: "Men",
    subCategory: "Topwear",
    price: 680,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    description: "Heavyweight 240 GSM cotton streetwear t-shirt with dropped shoulder cut and screen-printed graphic art."
  },
  {
    name: "Men Regular-Fit Linen Chambray Summer Shirt",
    category: "Men",
    subCategory: "Topwear",
    price: 1250,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    description: "Breathable linen-cotton blend chambray shirt designed to keep you cool and sharp in warm climates."
  },
  // Bottomwear
  {
    name: "Men Tailored Flat-Front Stretch Chino Trousers",
    category: "Men",
    subCategory: "Bottomwear",
    price: 1250,
    sizes: ["M", "L", "XL"],
    bestseller: true,
    description: "Modern tapered trousers made with flexible stretch cotton for unrestricted movement and sharp all-day styling."
  },
  {
    name: "Men Slim-Fit Vintage Wash Stretch Denim Jeans",
    category: "Men",
    subCategory: "Bottomwear",
    price: 1600,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    description: "Authentic 5-pocket denim styling with comfort stretch, whiskered vintage wash, and heavy-duty rivets."
  },
  {
    name: "Men Utility Multi-Pocket Cotton Cargo Pants",
    category: "Men",
    subCategory: "Bottomwear",
    price: 1350,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: false,
    description: "Rugged cotton twill cargo pants with reinforced knees, flap utility pockets, and adjustable waist tabs."
  },
  {
    name: "Men Lightweight Breathable Drawstring Linen Pants",
    category: "Men",
    subCategory: "Bottomwear",
    price: 1190,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    description: "Relaxed resort-fit linen trousers with an elastic drawstring waist and side slash pockets."
  },
  {
    name: "Men Athletic Tapered Tech Fleece Joggers",
    category: "Men",
    subCategory: "Bottomwear",
    price: 1050,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    description: "Slim athletic joggers featuring bonded zip pockets, ergonomic knee panelling, and stretch rib cuffs."
  },
  // Winterwear
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
    name: "Men Lightweight Packable Windbreaker Jacket",
    category: "Men",
    subCategory: "Winterwear",
    price: 1750,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    description: "Water-resistant, packable windbreaker jacket with zip front, elastic storm cuffs, and breathable mesh lining."
  },
  {
    name: "Men Sherpa-Collared Vintage Trucker Denim Jacket",
    category: "Men",
    subCategory: "Winterwear",
    price: 2600,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    description: "Classic denim trucker jacket lined with thick warm faux sherpa fleece and metal shank buttons."
  },
  {
    name: "Men Thermal Insulated Zip-Up Puffer Vest",
    category: "Men",
    subCategory: "Winterwear",
    price: 1950,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    description: "Sleeveless insulated puffer vest offering core body heat with lightweight convenience and fleece pockets."
  },
  {
    name: "Men Quarter-Zip Ribbed Merino Wool Sweater",
    category: "Men",
    subCategory: "Winterwear",
    price: 2150,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: false,
    description: "Fine-gauge merino wool sweater with antique brass quarter-zip pull and mock neck collar."
  },

  // ==================== KIDS ====================
  // Topwear
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
    name: "Boys Casual Graphic Pure Cotton T-Shirt",
    category: "Kids",
    subCategory: "Topwear",
    price: 480,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    description: "Durable reinforced stitching and fun contemporary print that retains its color wash after wash."
  },
  {
    name: "Girls Tiered Floral Cotton Summer Twirl Dress",
    category: "Kids",
    subCategory: "Topwear",
    price: 820,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Lightweight tiered twirl dress crafted in breathable cotton with vibrant pastel hues and flutter sleeves."
  },
  {
    name: "Boys Smart Striped Cotton Polo Tee",
    category: "Kids",
    subCategory: "Topwear",
    price: 540,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Classy striped polo shirt with ribbed collar and button placket for birthdays and family occasions."
  },
  {
    name: "Girls Ruffle-Trim Sleeveless Summer Top",
    category: "Kids",
    subCategory: "Topwear",
    price: 460,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Sweet delicate ruffle trim on shoulders with keyhole button back closure and light airy feel."
  },
  {
    name: "Boys Dinosaur Adventure Printed Cotton Tee",
    category: "Kids",
    subCategory: "Topwear",
    price: 420,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Playful cartoon print made with eco-friendly water-based inks on soft combed cotton."
  },
  // Bottomwear
  {
    name: "Kids Unisex Adjustable Denim Dungarees",
    category: "Kids",
    subCategory: "Bottomwear",
    price: 990,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Classic denim overalls with adjustable shoulder buckle straps and handy bib pockets."
  },
  {
    name: "Boys Relaxed-Fit Cotton Cargo Joggers",
    category: "Kids",
    subCategory: "Bottomwear",
    price: 750,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Sturdy cotton twill cargo pants featuring multiple functional pockets and elastic ankle cuffs."
  },
  {
    name: "Girls Stretchy Floral Printed Cotton Leggings",
    category: "Kids",
    subCategory: "Bottomwear",
    price: 390,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Ultra-comfy 4-way stretch leggings with an elastic non-pinch waistband for easy all-day movement."
  },
  {
    name: "Kids Elastic-Waist Cotton Twill Shorts",
    category: "Kids",
    subCategory: "Bottomwear",
    price: 490,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Lightweight summer shorts with functional drawstring, side pockets, and durable wash treatment."
  },
  {
    name: "Kids Unisex Thermal Brushed Sweatpants",
    category: "Kids",
    subCategory: "Bottomwear",
    price: 580,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Fleece-brushed inner lining for extra warmth during school mornings, with stretchy drawstring waistband."
  },
  // Winterwear
  {
    name: "Kids Warm Sherpa-Lined Zip Hoodie Jacket",
    category: "Kids",
    subCategory: "Winterwear",
    price: 1350,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Insulated winter jacket with soft sherpa lining to keep your little ones cozy during chilly weather."
  },
  {
    name: "Boys Colorblocked Pullover Fleece Sweatshirt",
    category: "Kids",
    subCategory: "Winterwear",
    price: 890,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Warm cotton-poly fleece pullover with sporty colorblocking and stretchy ribbed neck and cuffs."
  },
  {
    name: "Girls Hooded Quilted Puffer Winter Coat",
    category: "Kids",
    subCategory: "Winterwear",
    price: 1650,
    sizes: ["S", "M", "L"],
    bestseller: true,
    description: "Full-zip quilted coat with warm insulation, fleece lined pockets, and detachable faux-fur hood."
  },
  {
    name: "Kids Unisex Knitted Animal Ear Beanie & Sweater Set",
    category: "Kids",
    subCategory: "Winterwear",
    price: 1100,
    sizes: ["S", "M", "L"],
    bestseller: false,
    description: "Adorable non-itch acrylic knit sweater paired with matching animal ear beanie."
  },
  {
    name: "Boys Lightweight Water-Resistant Windbreaker",
    category: "Kids",
    subCategory: "Winterwear",
    price: 1200,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    description: "Bright neon accents with zip front, hood, and breathable underarm eyelets."
  }
];

const seed50Products = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas successfully!");

    // Check Cloudinary uploaded images in fashion_collection
    console.log("Fetching images from Cloudinary fashion_collection...");
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "fashion_collection",
      max_results: 100,
    });

    let imagesPool = (result.resources || []).map(r => r.secure_url);
    console.log(`Found ${imagesPool.length} Cloudinary fashion images.`);

    if (imagesPool.length < 10) {
      console.log("Uploading local assets to Cloudinary...");
      const files = fs.readdirSync(assetsDir).filter(f => f.startsWith("p_img") && f.endsWith(".png"));
      for (let i = 0; i < Math.min(files.length, 30); i++) {
        const filePath = path.join(assetsDir, files[i]);
        try {
          const res = await cloudinary.uploader.upload(filePath, {
            folder: "fashion_collection",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: "image",
          });
          imagesPool.push(res.secure_url);
        } catch (e) {
          console.log(`Upload notice: ${e.message}`);
        }
      }
    }

    if (imagesPool.length === 0) {
      throw new Error("No images available in Cloudinary.");
    }

    console.log(`Using ${imagesPool.length} images to build 3-4 multi-angle galleries for each product.`);

    // Clear old products
    console.log("Clearing old products from database...");
    await productModel.deleteMany({});

    // Map all 50 products with 3 to 4 distinct images each
    const finalProducts = products50.map((item, idx) => {
      // 3 or 4 images per product
      const numImages = idx % 2 === 0 ? 4 : 3;
      const productImages = [];
      for (let j = 0; j < numImages; j++) {
        const imageIndex = (idx * 2 + j) % imagesPool.length;
        productImages.push(imagesPool[imageIndex]);
      }

      return {
        name: item.name,
        description: item.description,
        price: item.price,
        image: productImages, // [cover_image, angle_2, angle_3, angle_4]
        category: item.category,
        subCategory: item.subCategory,
        sizes: item.sizes,
        bestseller: item.bestseller,
        date: Date.now() - idx * 86400000,
      };
    });

    await productModel.insertMany(finalProducts);
    console.log(`🎉 Successfully seeded all ${finalProducts.length} authentic products with 3-4 images each into MongoDB Atlas!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding 50 products:", error);
    process.exit(1);
  }
};

seed50Products();
