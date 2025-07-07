import { ChevronDown, Download } from "lucide-react"

const Hero = () => {
  return (
    <section
      id="home"
      className="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="text-center">
          <div className="mb-8 mt-12 animate-fadeInUp">
            <img
              src="/poza-profil.PNG"
              alt="Profile"
              className="w-60 cover  mx-auto mb-6 "
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-medium text-gray-900 dark:text-white mb-6 animate-fadeInUp">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text title bg-gradient-to-r from-blue-600 to-purple-600">Leca Marian-Cristian</span>
          </h1>

          <p className="title text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fadeInUp">
            A passionate Full Stack Developer creating amazing digital experiences with modern technologies and clean
            code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp">
            <a
              href="#contact"
              className="bg-blue-600  hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </a>
            <a
              href="/resume.pdf"
              download="LecaMarianCristianCv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center download space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Download size={20} />
              <span className="download">Download Resume</span>
            </a>
          </div>

          <div className="animate-bounce-slow w-full flex justify-center mt-8">
            <a
              href="#about"
              className="text-gray-600 down-arrow dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
