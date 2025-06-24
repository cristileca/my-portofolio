import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Experience from "./sections/Experience"
import Contact from "./sections/Contact"
import Testimonials from "./sections/Testimonials"

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
