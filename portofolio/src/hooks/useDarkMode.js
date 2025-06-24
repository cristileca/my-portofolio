"use client"

import { useState, useEffect } from "react"

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") return false

    // Check localStorage first
    const saved = localStorage.getItem("darkMode")
    if (saved !== null) {
      return JSON.parse(saved)
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    // Only run in browser
    
    localStorage.setItem("darkMode", JSON.stringify(isDark))
    if (isDark) {
            document.documentElement.classList.remove("dark")
    } else {
            document.documentElement.classList.add("dark")
    }
  }, [isDark])

  const toggleDark = () => setIsDark(!isDark)

  return [isDark, toggleDark]
}

