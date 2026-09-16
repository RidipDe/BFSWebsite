import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FaHeart, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { IoCalendarOutline, IoTimeOutline, IoLocationOutline, IoTicketOutline } from 'react-icons/io5';
import { featuredEvent } from '../data/featuredEvent';

const heroImage = '/images/wb2-.png';
const heroFeatherMask = '/images/hero-feather-mask.svg';

const HeroSection = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background-color: ${theme.colors.secondaryDark};
  min-height: 85vh;
  min-height: 85svh;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  color: white;
  text-align: center;

  &::before, &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &::before {
    inset: -12px;
    z-index: 0;
    background: url('${heroImage}') center / cover no-repeat;
    filter: blur(8px);
  }

  &::after {
    inset: 0;
    z-index: 2;
    background: linear-gradient(rgba(255, 247, 247, 0.3), rgba(129, 127, 127, 0.6));
  }
`;

const HeroImageSoftEdge = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: url('${heroImage}') center / contain no-repeat;
  filter: blur(8px);
  pointer-events: none;
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  min-width: 0;
  pointer-events: none;
  -webkit-mask-image: url('${heroFeatherMask}');
  mask-image: url('${heroFeatherMask}');
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  text-decoration: none;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.fontText};
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  min-height: 44px;
  max-width: 100%;

  &:hover {
    background-color: ${theme.colors.primaryLight};
    color: ${theme.colors.fontText};
    transform: translateY(-2px);
  }
`;

const HeroContent = styled.div`
  grid-area: 1 / 1;
  z-index: 3;
  justify-self: center;
  width: 100%;
  max-width: 800px;
  padding: clamp(3rem, 10vh, 6rem) 1rem;
  text-align: center;
  
  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.2;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  p {
    font-size: clamp(1.05rem, 3vw, 1.5rem);
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
`;

const DiscoverLink = styled.a`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(28rem, calc(100% - 2rem));
  min-height: 72px;
  margin: -2rem auto 0;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.secondary};
  border-radius: 8px;
  background: ${theme.colors.background};
  color: ${theme.colors.primaryDark};
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(44, 24, 16, 0.16);
  transition: border-color 0.2s ease;

  strong { display: block; font-size: 1.05rem; }
  small { display: block; color: ${theme.colors.textLight}; font-size: 0.875rem; }

  .direction {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${theme.colors.secondary};
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover, &:focus-visible {
    color: ${theme.colors.primaryDark};
    border-color: ${theme.colors.primary};
    svg { transform: translateY(4px); }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover svg, &:focus-visible svg { transform: none; }
  }
`;

const FeaturedEvents = styled.section`
  padding: clamp(2rem, 5vw, 4rem) 1rem;
  padding-top: 1.5rem;
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
  padding: clamp(2rem, 5vw, 4rem) 1rem;
  background-color: ${theme.colors.secondary};
`;

const HighlightsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const HighlightCard = styled.div`
  text-align: center;
  padding: clamp(1.25rem, 4vw, 2rem);
  min-width: 0;
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

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
  }
`;

const EventImage = styled.div`
  flex: 0 0 45%;
  min-width: 0;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }
`;

const EventContent = styled.div`
  flex: 1;
  min-width: 0;
  padding: clamp(1.25rem, 4vw, 3rem);
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
      flex-shrink: 0;
      margin-right: 0.5rem;
      color: ${theme.colors.primary};
    }
  }
`;

const EventButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: auto;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  font-weight: 600;
  flex: 1 1 11rem;

  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100%;
  }
  
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
        <HeroImageSoftEdge aria-hidden="true" />
        <HeroImage src={heroImage} alt="" aria-hidden="true" width={1536} height={1024} fetchPriority="high" />
        <HeroContent>
          <h1>Bengali Friends of Seattle</h1>
          <p>Celebrating Bengali Culture in the Pacific Northwest</p>
          <HeroButton to="/contact">Join Our Community</HeroButton>
        </HeroContent>
      </HeroSection>

      <DiscoverLink href="#durgotsav-2026">
        <span>
          <strong>More to celebrate</strong>
          <small>Discover Durgotsav below</small>
        </span>
        <span className="direction" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v16m-6-6 6 6 6-6" />
          </svg>
        </span>
      </DiscoverLink>

      <FeaturedEvents id="durgotsav-2026" tabIndex={-1} aria-labelledby="featured-event-heading">
        <h2 id="featured-event-heading">Featured Upcoming Event</h2>
        <FeaturedEventCard>
          <EventImage as="a" href={featuredEvent.image} target="_blank" rel="noopener noreferrer" aria-label="View the full Durgotsav Festival poster">
            <img src={featuredEvent.image} alt={featuredEvent.title + ' poster'} width={1010} height={1390} />
          </EventImage>
          <EventContent>
            <div>
              <EventTitle>{featuredEvent.title}</EventTitle>
              <EventDescription>{featuredEvent.description}</EventDescription>
              <EventDetails>
                <div><IoCalendarOutline aria-hidden="true" /> Date: {featuredEvent.date}</div>
                <div><IoTimeOutline aria-hidden="true" /> Schedule: {featuredEvent.schedule}</div>
                <div><IoLocationOutline aria-hidden="true" /> Location: {featuredEvent.location}, {featuredEvent.address}</div>
                <div><IoTicketOutline aria-hidden="true" /> Entry: Free on all three days</div>
              </EventDetails>
            </div>
            <EventButtons>
              <Button href={featuredEvent.rsvpUrl} className="primary" target="_blank" rel="noopener noreferrer">
                RSVP for Free
              </Button>
              <Button href={featuredEvent.image} className="secondary" target="_blank" rel="noopener noreferrer">
                View Full Poster
              </Button>
            </EventButtons>
          </EventContent>
        </FeaturedEventCard>
      </FeaturedEvents>

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
              <div className="stat">3+</div>
              <p>Years of preserving Bengali culture in Seattle</p>
            </HighlightCard>
          </HighlightsGrid>
        </HighlightsContainer>
      </HighlightsSection>
    </div>
  );
};

export default HomePage;
