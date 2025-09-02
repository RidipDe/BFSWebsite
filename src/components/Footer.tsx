import React from 'react';
import styled from 'styled-components';

import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primaryDark};
  color: ${theme.colors.fontText};
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 1rem;
`;

const FooterSection = styled.div`
  h3 {
    color: ${theme.colors.secondaryDark};
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    color: #fff;
    text-decoration: none;
    
    &:hover {
      color: #e91e63;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Bengali Friends of Seattle</h3>
          <p>Bringing the Bengali community together in the Greater Seattle area.</p>
        </FooterSection>
        <FooterSection>
          <h3>Connect With Us</h3>
          <SocialLinks>
            <a href="https://www.facebook.com/bengalifriendsofseattle" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/b.f.s_bengalifriendsofseattle/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          </SocialLinks>
        </FooterSection>
        <FooterSection>
          <h3>Contact</h3>
          <p>Email: bengalifriendsofseattle6@gmail.com</p>
          <p>Seattle, WA</p>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
