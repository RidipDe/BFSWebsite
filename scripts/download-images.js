const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

// List of images to download
const images = [
  {
    url: 'https://images.pexels.com/photos/2861656/pexels-photo-2861656.jpeg',
    filename: 'durga-puja.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/5998825/pexels-photo-5998825.jpeg',
    filename: 'saraswati-puja.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/8280794/pexels-photo-8280794.jpeg',
    filename: 'cultural-night.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/7725346/pexels-photo-7725346.jpeg',
    filename: 'hero-bg.jpg'
  }
];

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download all images
Promise.all(
  images.map(img => 
    downloadImage(img.url, path.join(imagesDir, img.filename))
  )
)
.then(() => console.log('All images downloaded successfully!'))
.catch(err => console.error('Error downloading images:', err));
