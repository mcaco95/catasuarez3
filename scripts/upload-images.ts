import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_SIZE = 2000; // Maximum dimension (width or height) in pixels
const QUALITY = 80; // Output quality (1-100)

async function optimizeImage(inputPath: string): Promise<Buffer> {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  if (!metadata.width || !metadata.height) {
    throw new Error('Could not read image metadata');
  }

  // Calculate new dimensions while maintaining aspect ratio
  let width = metadata.width;
  let height = metadata.height;
  
  if (width > MAX_SIZE || height > MAX_SIZE) {
    if (width > height) {
      height = Math.round((height * MAX_SIZE) / width);
      width = MAX_SIZE;
    } else {
      width = Math.round((width * MAX_SIZE) / height);
      height = MAX_SIZE;
    }
  }

  // Optimize the image
  return image
    .resize(width, height)
    .jpeg({ quality: QUALITY })
    .toBuffer();
}

async function uploadToCloudinary(imageBuffer: Buffer, publicId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: 'image',
        folder: 'images',
      },
      (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result.secure_url);
        else reject(new Error('No result from Cloudinary'));
      }
    );

    uploadStream.end(imageBuffer);
  });
}

async function processImage(imagePath: string): Promise<void> {
  try {
    console.log(`Processing ${imagePath}...`);
    
    // Generate a public ID from the file path
    const publicId = path
      .relative('public/images', imagePath)
      .replace(/\.[^/.]+$/, ''); // Remove file extension
    
    // Optimize the image
    const optimizedBuffer = await optimizeImage(imagePath);
    
    // Upload to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(optimizedBuffer, publicId);
    
    console.log(`✅ Successfully uploaded: ${cloudinaryUrl}`);
  } catch (error) {
    console.error(`❌ Error processing ${imagePath}:`, error);
  }
}

async function processDirectory(directory: string): Promise<void> {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      await processImage(fullPath);
    }
  }
}

// Main execution
(async () => {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error('Images directory not found!');
    process.exit(1);
  }

  console.log('Starting image processing and upload...');
  await processDirectory(imagesDir);
  console.log('Finished processing all images!');
})(); 