import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
`;

const Heading = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PhotoCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  &:hover {
    .overlay {
      opacity: 1;
    }
  }
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
  }
`;

const PhotoOverlay = styled.div.attrs({ className: 'overlay' })`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  text-align: center;
  padding: 1rem;
  h3 {
    margin-bottom: 0.5rem;
  }
  small {
    font-size: 0.8rem;
    margin-top: 0.3rem;
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  flex-direction: column;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: ${theme.colors.secondary};
  font-size: 28px;
  cursor: pointer;
  padding: 8px;
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const NavigationWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const NavButton = styled.button<{ disabled: boolean }>`
  background-color: ${props => (props.disabled ? '#aaaaaa' : '#e91e63')};
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 30px;
  padding: 8px 16px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  user-select: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => (props.disabled ? '#aaaaaa' : '#d81557')};
  }
`;

const ImageCaption = styled.div`
  color: ${theme.colors.secondary};
  text-align: center;
  margin-top: 10px;
  font-size: 1.1rem;
`;

const DirectoryGalleryPage: React.FC = () => {
  const [directories, setDirectories] = useState<{
    [key: string]: { name: string; images: string[] }
  }>({
    'festivals/durga-puja': {
      name: 'Durga Puja',
      images: ['/images/festivals/durga-puja/DurgaPujaFlyer.jpeg']
    },
    'cultural/independence-day': {
      name: 'Independence Day',
      images: [
        '/images/cultural/independence-day/independence-day-2025.png',
        '/images/cultural/independence-day/independence-day-2025-2.png'
      ]
    },
    'community': {
      name: 'Community',
      images: [
        '/images/community/wb.png',
        '/images/community/wb2-.png'
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

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedDirectory) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDirectory]);

  return (
    <GalleryContainer>
      <Heading>Directory Photo Gallery</Heading>
      <PhotoGrid>
        {Object.entries(directories).map(([dirPath, { name, images }]) => (
          <PhotoCard key={dirPath} onClick={() => setSelectedDirectory(dirPath)}>
            <img src={images[0]} alt={name} />
            <PhotoOverlay>
              <h3>{name}</h3>
              <small>{images.length} photos</small>
            </PhotoOverlay>
          </PhotoCard>
        ))}
      </PhotoGrid>

      <Modal isOpen={!!selectedDirectory}>
        {selectedDirectory && (
          <>
            <CloseButton onClick={handleCloseModal} aria-label="Close modal">×</CloseButton>

            <ModalContent>
              <img
                src={directories[selectedDirectory].images[currentIndex]}
                alt={`${directories[selectedDirectory].name} ${currentIndex + 1}`}
              />
            </ModalContent>

            <ImageCaption>
              {directories[selectedDirectory].name} ({currentIndex + 1}/{directories[selectedDirectory].images.length})
            </ImageCaption>

            <NavigationWrapper>
              <NavButton
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous photo"
              >
                ‹
              </NavButton>
              <NavButton
                onClick={handleNext}
                disabled={currentIndex === directories[selectedDirectory].images.length - 1}
                aria-label="Next photo"
              >
                ›
              </NavButton>
            </NavigationWrapper>
          </>
        )}
      </Modal>
    </GalleryContainer>
  );
};

export default DirectoryGalleryPage;
