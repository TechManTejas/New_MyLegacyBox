import React, { useContext } from "react";
import { defaultTheme } from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = React.createContext({
  theme: defaultTheme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const value = { theme: defaultTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
