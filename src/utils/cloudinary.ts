const CLOUDINARY_CLOUD_NAME = 'dqgqrvnnw';

export function getCloudinaryUrl(imagePath: string): string {
  // If it's already a full Cloudinary URL, return as is
  if (imagePath.includes('res.cloudinary.com')) {
    return imagePath;
  }

  // If it's already a Cloudinary public ID (v1746026927/images/...)
  if (imagePath.match(/v\d+\/images\//)) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${imagePath}`;
  }

  // Remove leading slash if present
  const cleanPath = imagePath.replace(/^\//, '');
  
  // Remove /public/ or public/ if present in the path
  const normalizedPath = cleanPath.replace(/^(\/)?public\//, '');
  
  // Construct the Cloudinary URL with optimization parameters
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${normalizedPath}`;
}

// Helper function to determine if a path is a remote URL
export function isRemoteUrl(path: string): boolean {
  return path.startsWith('http://') || path.startsWith('https://');
}

// Helper function to get image dimensions from Cloudinary URL
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getImageDimensions(_url: string): { width: number; height: number } {
  // Default dimensions for local development
  return {
    width: 1920,
    height: 1080
  };
} 