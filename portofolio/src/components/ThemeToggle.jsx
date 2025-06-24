"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
  const { isDark, toggleDark } = useTheme()

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle
