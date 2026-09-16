import React, { useState } from 'react';
import styled from 'styled-components';
import ImageDialog from '../components/ImageDialog';
import { theme } from '../styles/theme';

const GalleryContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 4rem) 1rem;
`;

const Heading = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
`;

const PhotoCard = styled.button`
  position: relative;
  min-width: 0;
  width: 100%;
  padding: 0;
  border: none;
  font: inherit;
  background: none;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  touch-action: manipulation;

  &:focus-visible {
    outline: 3px solid ${theme.colors.primary};
    outline-offset: 3px;
  }

  @media (min-width: 769px) and (hover: hover) and (pointer: fine) {
    &:hover .overlay,
    &:focus-visible .overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: clamp(220px, 65vw, 300px);
    object-fit: cover;
    display: block;
  }
`;

const PhotoOverlay = styled.span.attrs({ className: 'overlay' })`
  position: absolute;
  left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.3s ease;
  color: white;
  text-align: center;
  padding: 1rem;
  overflow-wrap: anywhere;

  small {
    font-size: 0.8rem;
    margin-top: 0.3rem;
  }

  @media (min-width: 769px) and (hover: hover) and (pointer: fine) {
    top: 0;
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const PhotoName = styled.span`
  font-size: 1.17em;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const DirectoryGalleryPage: React.FC = () => {
  const [directories] = useState<{
    [key: string]: { name: string; images: string[] }
  }>({
    'Durga Puja 2025': {
      name: 'Durga Puja 2025',
      images: ['/images/Gallery/Durga Puja 2025/1.jpg']
    },
    'Kobi Pronaam 2025': {
      name: 'Kobi Pronaam 2025',
      images: [
        '/images/Gallery/Kobi Pronaam 2025/1.jpg',
        '/images/Gallery/Kobi Pronaam 2025/2.jpg',
        '/images/Gallery/Kobi Pronaam 2025/3.jpg',
        '/images/Gallery/Kobi Pronaam 2025/4.jpg'
      ]
    },
    'Independence Day Parade 2025': {
      name: 'Independence Day Parade 2025',
      images: [
        '/images/Gallery/Independence Day Parade 2025/1.png',
        '/images/Gallery/Independence Day Parade 2025/2.jpg',
        '/images/Gallery/Independence Day Parade 2025/3.jpg',
        '/images/Gallery/Independence Day Parade 2025/4.jpg',
        '/images/Gallery/Independence Day Parade 2025/5.jpg'
      ]
    }
  });
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCloseModal = () => {
    setSelectedDirectory(null);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex(i => (i > 0 ? i - 1 : i));
  };

  const handleNext = () => {
    if (!selectedDirectory) return;
    const images = directories[selectedDirectory].images;
    setCurrentIndex(i => (i < images.length - 1 ? i + 1 : i));
  };

  return (
    <GalleryContainer>
      <Heading>Directory Photo Gallery</Heading>
      <PhotoGrid>
        {Object.entries(directories).map(([dirPath, { name, images }]) => (
          <PhotoCard
            key={dirPath}
            type="button"
            aria-haspopup="dialog"
            aria-label={`Open ${name} photos`}
            onClick={event => {
              event.currentTarget.focus({ preventScroll: true });
              setCurrentIndex(0);
              setSelectedDirectory(dirPath);
            }}
          >
            <img src={images[0]} alt={name} />
            <PhotoOverlay>
              <PhotoName>{name}</PhotoName>
              <small>{images.length} photos</small>
            </PhotoOverlay>
          </PhotoCard>
        ))}
      </PhotoGrid>

      {selectedDirectory && (
        <ImageDialog
          src={directories[selectedDirectory].images[currentIndex]}
          alt={`${directories[selectedDirectory].name} ${currentIndex + 1}`}
          caption={`${directories[selectedDirectory].name} (${currentIndex + 1}/${directories[selectedDirectory].images.length})`}
          label="Directory photo gallery"
          previousLabel="Previous photo"
          nextLabel="Next photo"
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < directories[selectedDirectory].images.length - 1}
          onPrevious={handlePrev}
          onNext={handleNext}
          onClose={handleCloseModal}
        />
      )}
    </GalleryContainer>
  );
};

export default DirectoryGalleryPage;
