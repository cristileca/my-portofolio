import { useEffect, useRef, useState } from "react"
import { skills } from "../data/skills"

const SkillBar = ({ skill, index }) => {
  const [visible, setVisible] = useState(false)
  const [displayLevel, setDisplayLevel] = useState(0)
  const ref = useRef()
  const intervalRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true)
          }, index * 25)
        } else {
          setVisible(false)
          setDisplayLevel(0)
          clearInterval(intervalRef.current)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      observer.disconnect()
      clearInterval(intervalRef.current)
    }
  }, [index])

  useEffect(() => {
    if (visible) {
      let current = 0
      const target = skill.level
      const duration = 1000 // ms
      const steps = Math.floor(duration / 16) // ~60fps
      const increment = target / steps

      intervalRef.current = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(intervalRef.current)
        }
        setDisplayLevel(Math.round(current))
      }, 16)
    }
  }, [visible, skill.level])

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{displayLevel}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: visible ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  )
}

const About = () => {
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
                functional digital experiences...
              </p>
              <p>
                I specialize in modern JavaScript frameworks, with expertise in React, Node.js, and cloud technologies...
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects...
              </p>
            </div>
          </div>

          <div className="animate-fadeInRight">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills & Technologies</h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Frontend Development</h4>
                {skills.frontend.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Backend Development</h4>
                {skills.backend.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i + skills.frontend.length} />
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
