const fs = require('fs');
const path = require('path');

// Define the image organization structure
const imageOrganization = {
  'festivals/durga-puja': [
    'DurgaPujaFlyer.jpeg',
  ],
  'cultural/independence-day': [
    'independence-day-2025.png',
    'independence-day-2025-2.png',
  ],
  'community': [
    'wb.png',
    'wb2-.png',
  ],
};

// Function to move a file
function moveFile(sourcePath, targetPath) {
  try {
    // Create target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Move the file
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Moved ${sourcePath} to ${targetPath}`);
  } catch (error) {
    console.error(`Error moving ${sourcePath}: ${error.message}`);
  }
}

// Main function to organize images
function organizeImages() {
  const publicImagesDir = path.join(process.cwd(), 'public', 'images');
  const imagesDir = path.join(process.cwd(), 'images');

  // Organize images according to the structure
  Object.entries(imageOrganization).forEach(([targetDir, fileNames]) => {
    fileNames.forEach(fileName => {
      // Check in public/images
      const publicSourcePath = path.join(publicImagesDir, fileName);
      if (fs.existsSync(publicSourcePath)) {
        const targetPath = path.join(imagesDir, targetDir, fileName);
        moveFile(publicSourcePath, targetPath);
      }

      // Check in images
      const imageSourcePath = path.join(imagesDir, fileName);
      if (fs.existsSync(imageSourcePath)) {
        const targetPath = path.join(imagesDir, targetDir, fileName);
        moveFile(imageSourcePath, targetPath);
      }
    });
  });

  console.log('Image organization complete!');
}

organizeImages();
