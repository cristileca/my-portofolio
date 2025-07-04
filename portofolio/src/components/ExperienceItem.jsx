import { useRef, useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";

const ExperienceItem = ({ exp, index }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.4,
        rootMargin: "-10% 0px -10% 0px", // triggers near center vertically
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

return (
    <div
        ref={ref}
        className={`relative flex items-center transition-all duration-700 ease-in-out
            ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
            ${isVisible
                ? "opacity-100 translate-x-0"
                : index % 2 === 0
                    ? "opacity-0 translate-x-12"
                    : "opacity-0 -translate-x-12"}
        `}
    >
        {/* Timeline dot */}
        <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

        {/* Content */}
        <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
            <div className="bg-white job dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                        <Calendar size={16} className="mr-1" />
                        {exp.duration}
                    </div>
                </div>

                <div className="flex items-center text-blue-600 dark:text-blue-400 mb-3">
                    <span className="font-semibold">{exp.company}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {exp.location}
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 technologies py-1 media bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
};

export default ExperienceItem;
