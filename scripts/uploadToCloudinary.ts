const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const sharp = require('sharp');
const { Readable } = require('stream');

interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: any;
}

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const publicDir = path.join(process.cwd(), 'public');
const imagesDir = path.join(publicDir, 'images');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

async function compressImage(inputPath: string): Promise<Buffer> {
  const stats = fs.statSync(inputPath);
  const ext = path.extname(inputPath).toLowerCase();
  
  if (stats.size <= MAX_FILE_SIZE) {
    return fs.readFileSync(inputPath);
  }

  console.log(`🔄 Compressing ${inputPath} (${(stats.size / 1024 / 1024).toFixed(2)}MB)...`);
  
  const image = sharp(inputPath);
  
  if (ext === '.png') {
    return await image
      .png({ quality: 80, compressionLevel: 9 })
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();
  } else {
    return await image
      .jpeg({ quality: 80 })
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();
  }
}

function bufferToStream(buffer: Buffer) {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    }
  });
  return readable;
}

async function uploadFile(filePath: string): Promise<CloudinaryUploadResult | null> {
  try {
    const relativePath = path.relative(publicDir, filePath);
    // Format the public_id: replace backslashes with forward slashes, remove spaces and file extension
    const formattedPath = relativePath
      .split(path.sep)
      .join('/')
      .replace(/\s+/g, '-')
      .replace(/\.[^/.]+$/, '');
    
    console.log(`Uploading ${relativePath}...`);
    
    // Compress image if needed
    const imageBuffer = await compressImage(filePath);
    
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: formattedPath,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error: Error | undefined, result: CloudinaryUploadResult) => {
          if (error) {
            console.error(`❌ Failed to upload ${relativePath}:`, error);
            reject(error);
          } else {
            console.log(`✅ Uploaded ${relativePath}`);
            console.log(`   URL: ${result.secure_url}`);
            resolve(result);
          }
        }
      );

      bufferToStream(imageBuffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error);
    return null;
  }
}

async function processDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        await uploadFile(fullPath);
      }
    }
  }
}

// Start the upload process
console.log('Starting image upload to Cloudinary...');
processDirectory(imagesDir)
  .then(() => console.log('✨ All uploads complete!'))
  .catch(console.error); 