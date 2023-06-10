"use client";
import { darkTheme } from "@/stiches.config";
import { ThemeProvider } from "next-themes";
import { createContext } from "react";

export const ThemeContext = createContext("");

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: "light",
        dark: darkTheme.className,
      }}
    >
      {children}
    </ThemeProvider>
  );
}
