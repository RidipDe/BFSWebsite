import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const Heading = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  h3 {
    color: #e91e63;
    margin-bottom: 1rem;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <AboutContainer>
      <Section>
        <Heading>About Bengali Friends of Seattle</Heading>
        <p>Bengali Friends of Seattle (BFS) is a vibrant cultural organization dedicated to preserving and promoting Bengali culture in the Greater Seattle area. Founded by passionate community members, BFS has grown into a thriving hub for Bengali cultural activities, festivals, and social gatherings.</p>
      </Section>

      <Section>
        <Heading>Our Mission</Heading>
        <Grid>
          <Card>
            <h3>Cultural Preservation</h3>
            <p>Preserving and promoting Bengali culture, traditions, and values in the Pacific Northwest.</p>
          </Card>
          <Card>
            <h3>Community Building</h3>
            <p>Creating a strong, supportive network for Bengali families in the Greater Seattle area.</p>
          </Card>
          <Card>
            <h3>Cultural Exchange</h3>
            <p>Fostering cultural exchange and understanding between Bengali community and other communities.</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <Heading>History</Heading>
        <p>Since its inception, BFS has been organizing major Bengali festivals like Durga Puja, Saraswati Puja, and various cultural programs. Our community has grown from a small group of families to a large, vibrant organization that serves as a home away from home for Bengali people in Seattle.</p>
      </Section>
    </AboutContainer>
  );
};

export default AboutPage;
