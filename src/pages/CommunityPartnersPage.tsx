import React, { useState } from 'react';
import styled from 'styled-components';
import ImageDialog from '../components/ImageDialog';
import { theme } from '../styles/theme';

const PageContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 2rem clamp(1rem, 4vw, 2rem);
`;

const PageTitle = styled.h1`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
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
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PartnerCard = styled.button`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  border-radius: 8px;
  padding: clamp(1rem, 3vw, 2rem);
  font: inherit;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  touch-action: manipulation;

  &:focus-visible {
    outline: 3px solid ${theme.colors.primary};
    outline-offset: 3px;
  }

  @media (min-width: 769px) and (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    &:hover .overlay,
    &:focus-visible .overlay {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const PartnerImageWrapper = styled.span`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  align-items: center;
  justify-items: center;
  background: #f5f5f5;

  @media (min-width: 769px) and (hover: hover) and (pointer: fine) {
    display: flex;
    justify-content: center;
  }
`;

const PartnerImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: block;
`;

const PartnerOverlay = styled.span.attrs({ className: 'overlay' })`
  min-height: 44px;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;

  @media (min-width: 769px) and (hover: hover) and (pointer: fine) {
    position: absolute;
    inset: 0;
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const PartnerName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  text-align: center;
  overflow-wrap: anywhere;
  margin: 0;
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

  return (
    <>
      <PageContainer>
        <PageTitle>Community Partners</PageTitle>
        <PageDescription>
          We are grateful to our community partners who support our mission to celebrate and promote Bengali culture and community in Seattle.
        </PageDescription>
        
        <PartnersGrid>
          {partners.map((partner, index) => (
            <PartnerCard
              key={partner.id}
              type="button"
              aria-haspopup="dialog"
              aria-label={`View ${partner.name || `community partner ${index + 1}`}`}
              onClick={event => {
                event.currentTarget.focus({ preventScroll: true });
                setSelectedIndex(index);
              }}
            >
              <PartnerImageWrapper>
                <PartnerImage src={partner.image} alt={partner.name || `Community partner ${index + 1}`} />
                <PartnerOverlay>View</PartnerOverlay>
              </PartnerImageWrapper>
              <PartnerName>{partner.name}</PartnerName>
            </PartnerCard>
          ))}
        </PartnersGrid>
      </PageContainer>

      {selectedIndex !== null && (
        <ImageDialog
          src={partners[selectedIndex].image}
          alt={partners[selectedIndex].name || `Community partner ${selectedIndex + 1}`}
          caption={`${partners[selectedIndex].name} (${selectedIndex + 1}/${partners.length})`}
          label="Community partners gallery"
          previousLabel="Previous partner"
          nextLabel="Next partner"
          hasPrevious={selectedIndex > 0}
          hasNext={selectedIndex < partners.length - 1}
          onPrevious={handlePrev}
          onNext={handleNext}
          onClose={handleCloseModal}
          closeOnBackground
        />
      )}
    </>
  );
};

export default CommunityPartnersPage;
