import { useState, useMemo, useContext } from "react";

import {
  type ThemeProviderProps,
  type Theme,
  ThemeContext,
} from "../types/theme-context";

export default function Theme({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeValue = useMemo(
    () => ({
      theme,
      toggle,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
