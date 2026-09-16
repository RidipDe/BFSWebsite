import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import DirectoryGalleryPage from './pages/DirectoryGalleryPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import DonationPage from './pages/DonationPage';
import CommunityPartnersPage from './pages/CommunityPartnersPage';
import { theme } from './styles/theme';
import GlobalStyle from './styles/theme';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
`;

const SkipLink = styled.a`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 100;
  padding: 0.75rem 1rem;
  background: ${theme.colors.background};
  transform: translateY(-200%);
  &:focus { transform: translateY(0); }
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <SkipLink href="#main-content">Skip to content</SkipLink>
          <Navbar />
          <MainContent id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* <Route path="/gallery" element={<GalleryPage />} /> */}
              <Route path="/gallery/directories" element={<DirectoryGalleryPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="/partners" element={<CommunityPartnersPage />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
