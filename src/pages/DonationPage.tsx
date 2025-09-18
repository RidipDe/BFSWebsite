import React from 'react';
import styled from 'styled-components';

const DonationContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
`;

const DonationSection = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DonationMethod = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }
`;

const EmailText = styled.p`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
`;

const DonationPage: React.FC = () => {
  return (
    <DonationContainer>
      <Title>Support BFS</Title>
      
      <DonationSection>
        <p>Your generous donations help us organize cultural events and support our community initiatives.</p>
        
        <DonationMethod>
          <h2>Donate via Zelle</h2>
          <EmailText>bengalifriendsofseattle6@gmail.com</EmailText>
          <p>Please include a note with your name and "BFS Website Donation" in the memo.</p>
        </DonationMethod>
        
        {/* Add QR code section once the image is available */}
        {/* <DonationMethod>
          <h2>Scan QR Code</h2>
          <p>Scan the QR code below to make a quick donation:</p>
          { ##### Add QR code image here }
          <p>Note: Please save a screenshot of your donation for our records.</p>
        </DonationMethod> */}
      </DonationSection>
      
      <p>For any questions about donations, please contact us at bengalifriendsofseattle6@gmail.com</p>
    </DonationContainer>
  );
};

export default DonationPage;
