import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#D32F2F', // Deep red
    primaryLight: '#FF5252', // Lighter red
    primaryDark: '#B71C1C', // Darker red
    secondary: '#f8d859ff', // Crème white
    secondaryDark: '#F5E6D3', // Darker crème
    text: '#2C1810', // Deep brown for text
    textLight: '#4A3831', // Lighter brown for secondary text
    background: '#ffffffff', //'#FFFBF5' // Very light crème for background
    fontText: '#ffffffff'
  }
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  a {
    color: ${theme.colors.primary};
    &:hover {
      color: ${theme.colors.primaryLight};
    }
  }
`;

export default GlobalStyle;
