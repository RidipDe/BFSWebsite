import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.secondary};
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
`;

const Logo = styled(Link)`
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: bold;
  color: ${theme.colors.primary};
  text-decoration: none;
  min-width: 0;
  flex: 1;
  line-height: 1.3;
  overflow-wrap: normal;
`;

const NavLinks = styled.div<{ $open: boolean }>`
  display: ${props => props.$open ? 'flex' : 'none'};
  flex-basis: 100%;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.5rem;

  @media (min-width: 1024px) {
    display: flex;
    flex-basis: auto;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    padding-top: 0;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0.5rem;
  
  &:hover {
    color: ${theme.colors.primary};
  }

  @media (min-width: 1024px) { padding-inline: 0; }
`;

const MenuButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 44px;
  min-width: 44px;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
  background: transparent;
  color: ${theme.colors.primary};
  cursor: pointer;

  svg { width: 24px; height: 24px; flex-shrink: 0; }
  @media (min-width: 1024px) { display: none; }
  @media (max-width: 359px) { span { display: none; } }
`;

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', onResize);
    return () => desktop.removeEventListener('change', onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !nav.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <Nav ref={nav} aria-label="Main navigation">
      <NavContainer>
        <Logo to="/">Bengali Friends of Seattle</Logo>
        <MenuButton
          ref={menuButton}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="navigation-links"
          onClick={() => setMenuOpen(open => !open)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d={menuOpen ? 'M6 6l12 12M6 18L18 6' : 'M3 6h18M3 12h18M3 18h18'} />
          </svg>
          <span>Menu</span>
        </MenuButton>
        <NavLinks id="navigation-links" $open={menuOpen} onClick={() => setMenuOpen(false)}>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/partners">Partners</NavLink>
          <NavLink to="/gallery/directories">Gallery</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/donate">Donate</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
