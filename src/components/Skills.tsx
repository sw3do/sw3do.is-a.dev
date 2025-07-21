import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { getLanguageIcon } from '../utils/icons';

interface SkillsProps {
  isDarkMode: boolean;
  topLanguages: [string, number][];
  totalProjects: number;
}

const SkillsComponent: React.FC<SkillsProps> = ({
  isDarkMode,
  topLanguages,
  totalProjects,
}) => {
  const { t } = useTranslation();

  const otherTechnologies = useMemo(() => [
    'Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API', 'Microservices', 'CI/CD',
    'Dart', 'Flutter', 'Astro', 'Kotlin', 'Swift', 'C#', 'Svelte', 'Nuxt.js', 'Express', 'NestJS', 'Spring',
    'MySQL', 'Firebase', 'Supabase', 'Prisma', 'Socket.io', 'React Native', 'Electron', 'Unity', 'Blender',
    'Webpack', 'Vite', 'Jest', 'Cypress', 'Storybook', 'Figma', 'Linux', 'Vim', 'GitLab', 'Vercel',
    'Netlify', 'Heroku', 'TensorFlow', 'PyTorch', 'OpenCV', 'NumPy', 'Pandas', 'Jupyter', 'Solidity',
    'Web3.js', 'Ethereum'
  ].slice(0, 30), []);

  return (
    <motion.div
      id="skills"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {t('skills.title')}
        </h2>
        <p className={`max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {t('skills.subtitle')}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topLanguages.map(([language, count], index) => {
            const percentage = Math.round((count / totalProjects) * 100);

            return (
              <motion.div
                key={language}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className={`rounded-xl p-6 border backdrop-blur-sm transition-all duration-300 ${isDarkMode
                  ? "bg-slate-800/60 border-slate-700/50 hover:border-blue-500/50"
                  : "bg-white/80 border-gray-300/50 hover:border-blue-500/50"
                  }`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)"
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getLanguageIcon(language)}
                    <span className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {language}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-blue-400">
                    {percentage}%
                  </div>
                </div>

                <div className="mb-3">
                  <div className={`flex justify-between text-sm mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span>{count} {t('skills.projects')}</span>
                    <span>{totalProjects} {t('skills.total')}</span>
                  </div>

                  <div className={`w-full rounded-full h-2.5 ${isDarkMode ? "bg-slate-700/50" : "bg-gray-300/50"}`}>
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 1.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12 text-center"
        >
          <h3 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {t('skills.otherTech')}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {otherTechnologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.2 + index * 0.05 }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${isDarkMode
                  ? "bg-slate-800/60 text-slate-300 border-slate-700/50 hover:bg-slate-700/60 hover:text-white"
                  : "bg-white/80 text-gray-700 border-gray-300/50 hover:bg-gray-100/80 hover:text-gray-900"
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Skills = React.memo(SkillsComponent);