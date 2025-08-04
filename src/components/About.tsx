import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import {
  FaTrophy,
  FaRocket,
  FaUsers,
  FaCode,
} from 'react-icons/fa';
import { Timeline } from './Timeline';

interface AboutProps {
  isDarkMode: boolean;
}

interface Achievement {
  icon: React.ReactElement;
  titleKey: string;
  descKey: string;
}

interface Experience {
  year: string;
  titleKey: string;
  companyKey: string;
  descriptionKey: string;
  technologies: string[];
}

export const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  const achievements: Achievement[] = [
    { icon: <FaTrophy className="w-6 h-6 text-yellow-400" />, titleKey: "achievements.items.problemSolver.title", descKey: "achievements.items.problemSolver.desc" },
    { icon: <FaRocket className="w-6 h-6 text-blue-400" />, titleKey: "achievements.items.fastLearner.title", descKey: "achievements.items.fastLearner.desc" },
    { icon: <FaUsers className="w-6 h-6 text-green-400" />, titleKey: "achievements.items.teamPlayer.title", descKey: "achievements.items.teamPlayer.desc" },
    { icon: <FaCode className="w-6 h-6 text-purple-400" />, titleKey: "achievements.items.cleanCode.title", descKey: "achievements.items.cleanCode.desc" }
  ];

  const experiences: Experience[] = [
    {
      year: "2025",
      titleKey: "experience.items.discordIdSpace.title",
      companyKey: "experience.items.discordIdSpace.company",
      descriptionKey: "experience.items.discordIdSpace.description",
      technologies: ["Nuxt", "Javascript-TypeScript", "TailwindCSS", "Discord API"]
    },
    {
      year: "2025",
      titleKey: "experience.items.animeEly.title",
      companyKey: "experience.items.animeEly.company",
      descriptionKey: "experience.items.animeEly.description",
      technologies: ["Next.js", "TailwindCSS", "Express", "MongoDB"]
    },
    {
      year: "2025",
      titleKey: "experience.items.fastDb.title",
      companyKey: "experience.items.fastDb.company",
      descriptionKey: "experience.items.fastDb.description",
      technologies: ["C++", "Node.js", "TypeScript", "Prisma"]
    },
    {
      year: "2025",
      titleKey: "experience.items.discordBot.title",
      companyKey: "experience.items.discordBot.company",
      descriptionKey: "experience.items.discordBot.description",
      technologies: ["TypeScript", "JavaScript", "Discord.js"]
    },
    {
      year: "2025",
      titleKey: "experience.items.mobileApps.title",
      companyKey: "experience.items.mobileApps.company",
      descriptionKey: "experience.items.mobileApps.description",
      technologies: ["React Native", "Expo", "Python", "PyQt5"]
    },
    {
      year: "2025",
      titleKey: "experience.items.rustDev.title",
      companyKey: "experience.items.rustDev.company",
      descriptionKey: "experience.items.rustDev.description",
      technologies: ["Rust", "API", "Crates.io"]
    }
  ];

  return (
    <>
      <motion.div
        id="about"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mb-8"
      >
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {t('achievements.title')}
          </h2>
          <p className={`max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {t('achievements.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className={`rounded-xl p-6 border text-center transition-all duration-300 overflow-hidden relative ${isDarkMode
                ? "glass-dark border-slate-700/50 hover:border-blue-500/50"
                : "glass border-gray-300/50 hover:border-blue-500/50"
                }`}
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 25px 50px -15px rgba(59, 130, 246, 0.4)"
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
              <div className="flex justify-center mb-4">
                {achievement.icon}
              </div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {t(achievement.titleKey)}
              </h3>
              <p className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {t(achievement.descKey)}
              </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Timeline data={experiences.map((exp, index) => ({
        title: exp.year,
        content: (
          <div>
            <div className="mb-4">
              <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {t(exp.titleKey)}
              </h3>
              <p className="text-blue-500 font-semibold text-sm mb-1">
                {t(exp.companyKey)}
              </p>
              <div className="flex items-center text-xs text-gray-500 mb-3">
                <div className={`w-2 h-2 rounded-full mr-2 ${index === 0 ? "bg-green-400" : "bg-gray-400"}`}></div>
                {index === 0 ? "Current" : "Completed"}
              </div>
            </div>
            <p className={`mb-4 text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {t(exp.descriptionKey)}
            </p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${isDarkMode
                    ? "bg-blue-900/40 text-blue-300 border-blue-700/50 hover:bg-blue-800/60"
                    : "bg-blue-100/80 text-blue-700 border-blue-300/50 hover:bg-blue-200/80"
                    }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )
      }))}
      />
    </>
  );
};