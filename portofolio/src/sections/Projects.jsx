import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"

const Projects = () => {
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fadeInUp">
            Here are some of my favorite projects that showcase my skills and passion for development.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8 animate-fadeInUp">
            Other Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + featuredProjects.length} />
            ))}
          </div>
        </div>

        <div className="text-center animate-fadeInUp">
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex technologies items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
          >
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
