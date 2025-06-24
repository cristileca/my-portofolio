"use client"

import { createContext, useContext } from "react"
import { useDarkMode } from "../hooks/useDarkMode"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, toggleDark] = useDarkMode()

  return <ThemeContext.Provider value={{ isDark, toggleDark }}>{children}</ThemeContext.Provider>
}
