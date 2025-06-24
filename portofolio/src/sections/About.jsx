import { skills } from "../data/skills"

const About = () => {
  const SkillBar = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  )

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp">About Me</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fadeInUp">
            I'm a passionate developer with over 5 years of experience creating digital solutions that make a
            difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInLeft">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Story</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                I started my journey in web development 5 years ago, driven by a passion for creating beautiful and
                functional digital experiences. What began as curiosity about how websites work has evolved into a
                fulfilling career building applications that solve real-world problems.
              </p>
              <p>
                I specialize in modern JavaScript frameworks, with expertise in React, Node.js, and cloud technologies.
                I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and
                best practices.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community through blog posts and mentoring.
              </p>
            </div>
          </div>

          <div className="animate-fadeInRight">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills & Technologies</h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Frontend Development</h4>
                {skills.frontend.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Backend Development</h4>
                {skills.backend.slice(0, 4).map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
