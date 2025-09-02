import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FaHeart, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { IoCalendarOutline, IoTimeOutline, IoLocationOutline, IoTicketOutline } from 'react-icons/io5';

const HeroSection = styled.section`
  background: linear-gradient(rgba(255, 247, 247, 0.3), rgba(129, 127, 127, 0.6)),
    url('/images/wb2-.png');
  background-size: cover;
  background-position: center -20px;
  height: 120vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.fontText};
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${theme.colors.primaryLight};
    transform: translateY(-2px);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 1rem;
  text-align: center;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
`;

const FeaturedEvents = styled.section`
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${theme.colors.background};
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: ${theme.colors.text};
  }
`;

const HighlightsSection = styled.section`
  padding: 4rem 1rem;
  background-color: ${theme.colors.secondary};
`;

const HighlightsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const HighlightCard = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 2.5rem;
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
  }

  h3 {
    color: ${theme.colors.text};
    margin-bottom: 1rem;
  }

  p {
    color: ${theme.colors.textLight};
  }

  .stat {
    font-size: 2rem;
    font-weight: bold;
    color: ${theme.colors.primary};
    margin: 1rem 0;
  }
`;

const FeaturedEventCard = styled.div`
  background: ${theme.colors.secondary};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  min-height: 500px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const EventImage = styled.div`
  flex: 0 0 45%;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const EventContent = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const EventTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const EventDescription = styled.p`
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const EventDetails = styled.div`
  margin-bottom: 1.5rem;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    color: ${theme.colors.text};

    svg {
      margin-right: 0.5rem;
      color: ${theme.colors.primary};
    }
  }
`;

const EventButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Button = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  font-weight: 600;
  flex: 1;
  
  &.primary {
    background-color: ${theme.colors.primary};
    color: white;

    &:hover {
      background-color: ${theme.colors.primaryDark};
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primary};

    &:hover {
      background-color: ${theme.colors.primary};
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection>
        <HeroContent>
          <h1>Bengali Friends of Seattle</h1>
          <p>Celebrating Bengali Culture in the Pacific Northwest</p>
          <HeroButton>Join Our Community</HeroButton>
        </HeroContent>
      </HeroSection>

      <HighlightsSection>
        <HighlightsContainer>
          <h2 style={{ textAlign: 'center', color: theme.colors.text }}>BFS Community Highlights</h2>
          <HighlightsGrid>
            <HighlightCard>
              <FaUsers className="icon" />
              <h3>Growing Community</h3>
              <div className="stat">100+</div>
              <p>Active Bengali families in the Greater Seattle area</p>
            </HighlightCard>

            <HighlightCard>
              <FaCalendarAlt className="icon" />
              <h3>Annual Events</h3>
              <div className="stat">10+</div>
              <p>Cultural events and festivals celebrated annually</p>
            </HighlightCard>

            <HighlightCard>
              <FaHeart className="icon" />
              <h3>Years of Heritage</h3>
              <div className="stat">5+</div>
              <p>Years of preserving Bengali culture in Seattle</p>
            </HighlightCard>
          </HighlightsGrid>
        </HighlightsContainer>
      </HighlightsSection>
      
      <FeaturedEvents>
        <h2>Featured Event</h2>
        <FeaturedEventCard>
          <EventImage>
            <img src="/images/DurgaPujaFlyer.jpeg" alt="Durga Puja 2025" />
          </EventImage>
          <EventContent>
            <div>
              <EventTitle>Durga Puja 2025</EventTitle>
              <EventDescription>
                Join us for the grand celebration of Durga Puja, the biggest Bengali festival of the year. 
                Experience three days of spiritual devotion, cultural performances, authentic Bengali cuisine, 
                and community gatherings. This year's celebration will feature special performances by local 
                artists, traditional aarti ceremonies, and a grand feast on Vijaya Dashami.
              </EventDescription>
              <EventDetails>
                <div>
                  <IoCalendarOutline /> Date: September 26-28, 2025
                </div>
                <div>
                  <IoTimeOutline /> Time: 10:00 AM - 10:00 PM
                </div>
                <div>
                  <IoLocationOutline /> Location: Veda Temple, Redmond, WA
                </div>
                <div>
                  <IoTicketOutline /> Entry: Free
                </div>
              </EventDetails>
            </div>
            <EventButtons>
              <Button href="/events/durga-puja-2025" className="secondary">
                More Information
              </Button>
              <Button href="https://forms.example.com/durga-puja-2025" className="primary" target="_blank" rel="noopener noreferrer">
                Register Now
              </Button>
            </EventButtons>
          </EventContent>
        </FeaturedEventCard>
      </FeaturedEvents>
    </div>
  );
};

export default HomePage;
