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

export const directories: Directory[] = [
  {
    "name": "images",
    "photos": [
      {
        "id": "images/DurgaPujaFlyer.jpeg",
        "src": "/images/DurgaPujaFlyer.jpeg",
        "name": "DurgaPujaFlyer.jpeg",
        "directory": "images"
      },
      {
        "id": "images/independence-day-2025-2.png",
        "src": "/images/independence-day-2025-2.png",
        "name": "independence-day-2025-2.png",
        "directory": "images"
      },
      {
        "id": "images/independence-day-2025.png",
        "src": "/images/independence-day-2025.png",
        "name": "independence-day-2025.png",
        "directory": "images"
      },
      {
        "id": "images/wb.png",
        "src": "/images/wb.png",
        "name": "wb.png",
        "directory": "images"
      },
      {
        "id": "images/wb2-.png",
        "src": "/images/wb2-.png",
        "name": "wb2-.png",
        "directory": "images"
      }
    ],
    "thumbnailSrc": "/images/DurgaPujaFlyer.jpeg"
  },
  {
    "name": "Root",
    "photos": [
      {
        "id": "independence-day-2025.png",
        "src": "/independence-day-2025.png",
        "name": "independence-day-2025.png",
        "directory": "/"
      }
    ],
    "thumbnailSrc": "/independence-day-2025.png"
  }
];