const fs = require('fs');
const path = require('path');

// Function to get all image files recursively
function getAllImageFiles(directory) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  let results = [];

  function traverse(currentPath, relativePath = '') {
    const files = fs.readdirSync(currentPath);
    
    files.forEach(file => {
      const filePath = path.join(currentPath, file);
      const fileRelativePath = path.join(relativePath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverse(filePath, fileRelativePath);
      } else if (imageExtensions.includes(path.extname(file).toLowerCase())) {
        results.push({
          directory: relativePath || '/',
          path: fileRelativePath.replace(/\\/g, '/'),
          name: file,
        });
      }
    });
  }

  traverse(directory);
  return results;
}

// Function to group images by directory
function groupImagesByDirectory(images) {
  const directories = {};

  images.forEach(image => {
    if (!directories[image.directory]) {
      directories[image.directory] = {
        name: image.directory === '/' ? 'Root' : image.directory,
        photos: [],
      };
    }

    directories[image.directory].photos.push({
      id: image.path,
      src: '/' + image.path,
      name: image.name,
      directory: image.directory,
    });
  });

  // Set the first image of each directory as the thumbnail
  Object.values(directories).forEach(dir => {
    dir.thumbnailSrc = dir.photos[0].src;
  });

  return Object.values(directories);
}

// Get all images from public and images directories
const publicImages = getAllImageFiles(path.join(process.cwd(), 'public'));
const rootImages = getAllImageFiles(path.join(process.cwd(), 'images'));

// Combine and group all images
const allImages = [...publicImages, ...rootImages];
const groupedDirectories = groupImagesByDirectory(allImages);

// Create the TypeScript output
const tsOutput = `
export interface Photo {
  id: string;
  src: string;
  name: string;
  directory: string;
}

export interface Directory {
  name: string;
  thumbnailSrc: string;
  photos: Photo[];
}

export const directories: Directory[] = ${JSON.stringify(groupedDirectories, null, 2)};
`;

// Write the output to a TypeScript file
fs.writeFileSync(
  path.join(process.cwd(), 'src', 'data', 'photoDirectories.ts'),
  tsOutput.trim()
);

console.log('Photo directories data has been generated successfully!');
