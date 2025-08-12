"use client";
import { Theme } from "@radix-ui/themes";
import React, { createContext, ReactNode, useContext, useState } from "react";

const themeContext = createContext<{
  dark: boolean;
  setDark: (val: boolean) => void;
}>({
  dark: false,
  setDark: () => {},
});
export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dark, setDark] = useState<boolean>(true);
  return (
    <themeContext.Provider value={{ dark, setDark}}>
      <Theme appearance={dark ? "dark" : "light"}>{children}</Theme>
    </themeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(themeContext);
}
