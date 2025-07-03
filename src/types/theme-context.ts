import { createContext, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggle: () => {},
});

export interface ThemeProviderProps {
  children: ReactNode;
}