"use client"
import { useState, useEffect } from "react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false
    const saved = localStorage.getItem("darkMode")
    if (saved !== null) return JSON.parse(saved)
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    localStorage.setItem("darkMode", JSON.stringify(isDark))
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
    >
      Toggle Theme
    </button>
  )
}
