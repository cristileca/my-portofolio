import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 transform hover:scale-110"
                aria-label={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Built with React, Vite, and Tailwind CSS</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">© 2024 Leca Marian-Cristian. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
