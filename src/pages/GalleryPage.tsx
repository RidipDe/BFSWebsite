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

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => (props.active ? '#e91e63' : '#f0f0f0')};
  color: ${props => (props.active ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${props => (props.active ? '#d81557' : '#e0e0e0')};
  }
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

interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
  date: string;
}

const photos: Photo[] = [
  { id: 1, src: '/images/durga-puja.jpg', title: 'Durga Puja 2024', category: 'Festivals', date: 'October 2024' },
  { id: 2, src: '/images/saraswati-puja.jpg', title: 'Saraswati Puja 2025', category: 'Festivals', date: 'February 2025' },
  { id: 3, src: '/images/cultural-night.jpg', title: 'Cultural Night Performance', category: 'Cultural', date: 'December 2024' },
  { id: 4, src: '/images/independence-day-2025.png', title: 'Independence Day Celebration', category: 'Cultural', date: 'August 2025' },
  { id: 5, src: '/images/durga-puja-2.jpg', title: 'Durga Puja 2024', category: 'Festivals', date: 'October 2024' },
  { id: 6, src: '/images/durga-puja-3.jpg', title: 'Durga Puja 2024', category: 'Festivals', date: 'October 2024' },
  { id: 7, src: '/images/independence-day-2025-2.png', title: 'Independence Day Celebration', category: 'Cultural', date: 'August 2025' },

];

const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedGroupTitle, setSelectedGroupTitle] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['All', 'Festivals', 'Cultural', 'Community'];

  const filteredPhotos = activeFilter === 'All' ? photos : photos.filter(photo => photo.category === activeFilter);

  const groupedPhotos = filteredPhotos.reduce<Record<string, Photo[]>>((acc, photo) => {
    if (!acc[photo.title]) acc[photo.title] = [];
    acc[photo.title].push(photo);
    return acc;
  }, {});

  const groupTitles = Object.keys(groupedPhotos);

  const openModalForGroup = (title: string) => {
    setSelectedGroupTitle(title);
    setCurrentIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedGroupTitle(null);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex(i => (i > 0 ? i - 1 : i));
  };

  const handleNext = () => {
    if (!selectedGroupTitle) return;
    const group = groupedPhotos[selectedGroupTitle];
    setCurrentIndex(i => (i < group.length - 1 ? i + 1 : i));
  };

  const selectedPhotos = selectedGroupTitle ? groupedPhotos[selectedGroupTitle] : [];

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedGroupTitle) return;
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
  }, [selectedGroupTitle]);

  return (
    <GalleryContainer>
      <Heading>Photo Gallery</Heading>
      <FilterContainer>
        {categories.map(cat => (
          <FilterButton
            key={cat}
            active={activeFilter === cat}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </FilterButton>
        ))}
      </FilterContainer>
      <PhotoGrid>
        {groupTitles.map(title => {
          const group = groupedPhotos[title];
          const thumbnail = group[0];
          return (
            <PhotoCard key={title} onClick={() => openModalForGroup(title)}>
              <img src={thumbnail.src} alt={thumbnail.title} />
              <PhotoOverlay>
                <h3>{thumbnail.title}</h3>
                <p>{thumbnail.date}</p>
                {group.length > 1 && <small>{group.length} photos</small>}
              </PhotoOverlay>
            </PhotoCard>
          );
        })}
      </PhotoGrid>

      <Modal isOpen={!!selectedGroupTitle}>
        {selectedGroupTitle && (
          <>
            <CloseButton onClick={handleCloseModal} aria-label="Close modal">×</CloseButton>

            <ModalContent>
              <img
                src={selectedPhotos[currentIndex]?.src}
                alt={selectedPhotos[currentIndex]?.title}
                key={selectedPhotos[currentIndex]?.id}
              />
            </ModalContent>

            <ImageCaption>
              {selectedPhotos[currentIndex]?.title} - {selectedPhotos[currentIndex]?.date} ({currentIndex + 1}/{selectedPhotos.length})
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
                disabled={currentIndex === selectedPhotos.length - 1}
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

export default GalleryPage;