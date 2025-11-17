import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PartnerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    .overlay {
      opacity: 1;
    }
  }
`;

const PartnerImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

const PartnerImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  width: 100%;
`;

const PartnerOverlay = styled.div.attrs({ className: 'overlay' })`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
`;

const PartnerName = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.primary};
  text-align: center;
  margin: 0;
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  flex-direction: column;
  cursor: pointer;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
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

interface Partner {
  id: string;
  name: string;
  image: string;
}

const CommunityPartnersPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Partner data - update with your actual partner information
  const partners: Partner[] = [
    {
      id: 'partner1',
      name: '',
      image: '/images/CommunityPartners/1.jpg',
    },
    {
      id: 'partner2',
      name: '',
      image: '/images/CommunityPartners/2.jpg',
    },
    {
      id: 'partner3',
      name: '',
      image: '/images/CommunityPartners/3.jpg',
    },
    {
      id: 'partner4',
      name: '',
      image: '/images/CommunityPartners/4.jpg',
    },
    {
      id: 'partner5',
      name: '',
      image: '/images/CommunityPartners/5.jpg',
    },
    {
      id: 'partner6',
      name: '',
      image: '/images/CommunityPartners/6.jpg',
    },
    {
      id: 'partner7',
      name: '',
      image: '/images/CommunityPartners/7.jpg',
    },
    {
      id: 'partner8',
      name: '',
      image: '/images/CommunityPartners/8.jpg',
    },
    {
      id: 'partner9',
      name: '',
      image: '/images/CommunityPartners/9.jpg',
    }
  ];

  const handleCloseModal = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    setSelectedIndex(i => (i !== null && i > 0 ? i - 1 : i));
  };

  const handleNext = () => {
    setSelectedIndex(i => (i !== null && i < partners.length - 1 ? i + 1 : i));
  };

  // Keyboard navigation for modal
  useEffect(() => {
    if (selectedIndex === null) return;
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
  }, [selectedIndex]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the modal background, not the content
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      <PageContainer>
        <PageTitle>Community Partners</PageTitle>
        <PageDescription>
          We are grateful to our community partners who support our mission to celebrate and promote Bengali culture and community in Seattle.
        </PageDescription>
        
        <PartnersGrid>
          {partners.map((partner, index) => (
            <PartnerCard key={partner.id} onClick={() => setSelectedIndex(index)}>
              <PartnerImageWrapper>
                <PartnerImage src={partner.image} alt={partner.name} />
                <PartnerOverlay>View</PartnerOverlay>
              </PartnerImageWrapper>
              <PartnerName>{partner.name}</PartnerName>
            </PartnerCard>
          ))}
        </PartnersGrid>
      </PageContainer>

      <Modal isOpen={selectedIndex !== null} onClick={handleBackgroundClick}>
        {selectedIndex !== null && (
          <>
            <CloseButton onClick={handleCloseModal} aria-label="Close modal">×</CloseButton>

            <ModalContent>
              <img
                src={partners[selectedIndex].image}
                alt={partners[selectedIndex].name}
              />
            </ModalContent>

            <ImageCaption>
              {partners[selectedIndex].name} ({selectedIndex + 1}/{partners.length})
            </ImageCaption>

            <NavigationWrapper>
              <NavButton
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                aria-label="Previous partner"
              >
                ‹
              </NavButton>
              <NavButton
                onClick={handleNext}
                disabled={selectedIndex === partners.length - 1}
                aria-label="Next partner"
              >
                ›
              </NavButton>
            </NavigationWrapper>
          </>
        )}
      </Modal>
    </>
  );
};

export default CommunityPartnersPage;
