"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"
import Dashboard from "./DashboardAdmin"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0);
  const [startTime, setStartTime] = useState(null);

  
  const handleLogoClick = () => {
    const now = Date.now();
    if (!startTime) {
      setStartTime(now);
      setLogoClicks(1);
    } else {
      const elapsed = now - startTime;

      if (elapsed <= 5000) {
        setLogoClicks((prev) => prev + 1);
      } else {
        setStartTime(now);
        setLogoClicks(1);
      }
    }
  };

  useEffect(() => {
    if (!startTime) return;

    const timer = setTimeout(() => {
      setLogoClicks(0);
      setStartTime(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [startTime]);

  useEffect(() => {
    if (logoClicks >= 5) {
      window.location.search = "?admin=secret";
    }
  }, [logoClicks]);

  const navItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full nav bg-white/70 dark:bg-gray-900/70 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => {scroll.scrollToTop(); handleLogoClick()}}
              className="text-2xl  logo font-bold text-gray-900 dark:text-white cursor-pointer"
            >
              Portofolio
            </button>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                smooth={true}
                offset={-64} 
                duration={400}
                className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </ScrollLink>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden backdrop-blur-md bg-none ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth={true}
              offset={-64}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer block text-left w-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              {item.name}
            </ScrollLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
