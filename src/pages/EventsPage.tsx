import React from 'react';
import styled from 'styled-components';

const EventsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
`;

const Heading = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const EventCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const EventContent = styled.div`
  padding: 1.5rem;

  h3 {
    color: #e91e63;
    margin-bottom: 1rem;
  }
`;

const EventDetails = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #666;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const RegisterButton = styled.button`
  background-color: #e91e63;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d81557;
  }
`;

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Durga Puja 2025',
    date: 'September 26-28, 2025',
    location: 'Veda Temple, Redmond, WA',
    description: 'Join us for the grand celebration of Durga Puja with traditional rituals, cultural programs, and Bengali cuisine.',
    image: '/images/placeholder.svg'
  },
  {
    id: 2,
    title: 'Saraswati Puja 2026',
    date: 'TBD',
    location: 'TBD',
    description: 'Annual celebration of Saraswati Puja with traditional prayers, cultural performances, and community gathering.',
    image: ''
  },
  {
    id: 3,
    title: 'Summer Picnic 2026',
    date: 'TBD',
    location: 'TBD',
    description: 'Annual summer picnic with outdoor games, Bengali food, and fun activities for the whole family.',
    image: ''
  }
];

const EventsPage: React.FC = () => {
  return (
    <EventsContainer>
      <Heading>Upcoming Events</Heading>
      
      <EventsGrid>
        {upcomingEvents.map(event => (
          <EventCard key={event.id}>
            <img src={event.image} alt={event.title} />
            <EventContent>
              <h3>{event.title}</h3>
              <EventDetails>
                <span>📅 {event.date}</span>
              </EventDetails>
              <EventDetails>
                <span>📍 {event.location}</span>
              </EventDetails>
              <p>{event.description}</p>
              <RegisterButton>Register Now</RegisterButton>
            </EventContent>
          </EventCard>
        ))}
      </EventsGrid>
    </EventsContainer>
  );
};

export default EventsPage;
