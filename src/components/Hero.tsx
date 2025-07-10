import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import {
  FaFolder,
  FaStar,
  FaUsers,
  FaCodeBranch,
  FaMapMarkerAlt,
  FaLink,
  FaCalendarAlt,
} from 'react-icons/fa';
import { GitHubUser } from '../types/github';

interface HeroProps {
  isDarkMode: boolean;
  user: GitHubUser | null;
  typeText: string;
  totalStars: number;
  totalForks: number;
  isClient: boolean;
  getCreatedYear: () => string;
}

export const Hero: React.FC<HeroProps> = ({
  isDarkMode,
  user,
  typeText,
  totalStars,
  totalForks,
  isClient,
  getCreatedYear,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      id="home"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center mb-16 relative"
    >
      <div className="absolute inset-0 -mx-6 -my-12 pointer-events-none">
        <div
          className={`w-full h-full opacity-30 ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}
          style={{
            backgroundImage: `
              linear-gradient(${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 0 0',
            maskImage: 'radial-gradient(ellipse 120% 100% at 50% 50%, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 120% 100% at 50% 50%, black 40%, transparent 80%)'
          }}
        />
      </div>

      <div className="relative inline-block mb-8">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-sm" />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-44 h-44 rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-md" />
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-75"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          <motion.div
            className="relative bg-slate-900 rounded-full p-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={user?.avatar_url}
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-2xl"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.6 }}
            />

            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {isClient && [...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50 pointer-events-none"
              style={{
                top: `${25 + Math.sin(i * 90) * 50}%`,
                left: `${25 + Math.cos(i * 90) * 50}%`,
                willChange: 'transform, opacity'
              }}
              animate={{
                y: [-8, -16, -8],
                opacity: [0.3, 0.6, 0.3],
                scale: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.h1
          className={`text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
            ? "from-blue-400 via-white to-cyan-400"
            : "from-blue-600 via-gray-800 to-cyan-600"
            }`}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% auto",
            willChange: 'background-position'
          }}
        >
          {user?.name || "sw3do"}
        </motion.h1>

        <motion.div
          className="absolute -left-4 top-1/2 w-2 h-0.5 bg-blue-400"
          animate={{
            width: [8, 40, 8],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute -right-4 top-1/2 w-2 h-0.5 bg-cyan-400"
          animate={{
            width: [8, 35, 8],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <motion.p
        className={`text-xl mb-4 max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {user?.bio || t('hero.bio')}
      </motion.p>

      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className={`text-2xl font-mono min-h-[2rem] flex items-center justify-center transition-colors duration-300 ${isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}>
          <span className="mr-1">&gt;</span>
          <span>{typeText}</span>
          <motion.span
            className={`inline-block w-0.5 h-6 ml-1 transition-colors duration-300 ${isDarkMode ? "bg-blue-400" : "bg-blue-600"
              }`}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-400"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {user?.location && (
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        )}
        {user?.blog && (
          <div className="flex items-center space-x-1">
            <FaLink className="w-4 h-4" />
            <a href={user.blog} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              {t('hero.website')}
            </a>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <FaCalendarAlt className="w-4 h-4" />
          <span>{t('hero.location', { year: getCreatedYear() })}</span>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className={`text-center rounded-xl p-6 border transition-all duration-300 ${isDarkMode
            ? "bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50"
            : "bg-white/80 border-gray-300/50 hover:border-blue-500/50"
            }`}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
        >
          <div className="flex items-center justify-center mb-2">
            <FaFolder className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-1">{user?.public_repos}</div>
          <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t('hero.stats.repositories')}</div>
        </motion.div>

        <motion.div
          className={`text-center rounded-xl p-6 border transition-all duration-300 ${isDarkMode
            ? "bg-slate-800/50 border-slate-700/50 hover:border-green-500/50"
            : "bg-white/80 border-gray-300/50 hover:border-green-500/50"
            }`}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(34, 197, 94, 0.3)" }}
        >
          <div className="flex items-center justify-center mb-2">
            <FaStar className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400 mb-1">{totalStars}</div>
          <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t('hero.stats.totalStars')}</div>
        </motion.div>

        <motion.div
          className={`text-center rounded-xl p-6 border transition-all duration-300 ${isDarkMode
            ? "bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50"
            : "bg-white/80 border-gray-300/50 hover:border-purple-500/50"
            }`}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
        >
          <div className="flex items-center justify-center mb-2">
            <FaUsers className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-purple-400 mb-1">{user?.followers}</div>
          <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t('hero.stats.followers')}</div>
        </motion.div>

        <motion.div
          className={`text-center rounded-xl p-6 border transition-all duration-300 ${isDarkMode
            ? "bg-slate-800/50 border-slate-700/50 hover:border-orange-500/50"
            : "bg-white/80 border-gray-300/50 hover:border-orange-500/50"
            }`}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.3)" }}
        >
          <div className="flex items-center justify-center mb-2">
            <FaCodeBranch className="w-6 h-6 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-orange-400 mb-1">{totalForks}</div>
          <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t('hero.stats.totalForks')}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}; 