export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  text: string;
  textLight: string;
  background: string;
}

export interface Theme {
  colors: ThemeColors;
}

export interface ThemeVariant {
  name: string;
  colors: ThemeColors;
}
