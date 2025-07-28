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
      <div className="absolute inset-0 -mx-6 -my-12 pointer-events-none overflow-hidden">
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
        
        {/* Floating geometric shapes */}
        {isClient && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${isDarkMode ? 'bg-blue-400/20' : 'bg-blue-600/15'} rounded-full`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 8)}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              x: [-10, 10, -10],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 8 + (i * 1.5),
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative inline-block mb-8">
        {/* Outer rotating rings */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-52 h-52 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-sm" />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-cyan-500/25 via-pink-500/25 to-purple-500/25 blur-md" />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-44 h-44 rounded-full bg-gradient-to-r from-emerald-500/15 via-blue-500/15 to-violet-500/15 blur-lg" />
        </motion.div>

        <div className="relative">
          {/* Enhanced gradient border */}
          <motion.div
            className="absolute -inset-2 rounded-full opacity-75 gradient-shift"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.08, 1]
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Glassmorphism container */}
          <motion.div
            className={`relative rounded-full p-2 ${isDarkMode ? 'glass-dark' : 'glass'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={user?.avatar_url}
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-2xl ring-2 ring-white/20"
              whileHover={{ 
                rotate: [0, -3, 3, 0],
                scale: 1.02
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Enhanced overlay effects */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-t from-blue-500/30 via-transparent to-purple-500/20"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                background: [
                  'linear-gradient(to top, rgba(59, 130, 246, 0.3), transparent, rgba(168, 85, 247, 0.2))',
                  'linear-gradient(to top, rgba(168, 85, 247, 0.3), transparent, rgba(59, 130, 246, 0.2))',
                  'linear-gradient(to top, rgba(59, 130, 246, 0.3), transparent, rgba(168, 85, 247, 0.2))'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
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
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className={`text-center rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'glass-dark' : 'glass'}`}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.4)"
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10">
            <motion.div 
              className="flex items-center justify-center mb-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <FaFolder className="w-7 h-7 text-blue-400" />
            </motion.div>
            <motion.div 
              className="text-3xl font-bold text-blue-400 mb-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {user?.public_repos}
            </motion.div>
            <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {t('hero.stats.repositories')}
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`text-center rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'glass-dark' : 'glass'}`}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -15px rgba(34, 197, 94, 0.4)"
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10">
            <motion.div 
              className="flex items-center justify-center mb-3"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <FaStar className="w-7 h-7 text-green-400" />
            </motion.div>
            <motion.div 
              className="text-3xl font-bold text-green-400 mb-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {totalStars}
            </motion.div>
            <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {t('hero.stats.totalStars')}
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`text-center rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'glass-dark' : 'glass'}`}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.4)"
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10">
            <motion.div 
              className="flex items-center justify-center mb-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <FaUsers className="w-7 h-7 text-purple-400" />
            </motion.div>
            <motion.div 
              className="text-3xl font-bold text-purple-400 mb-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {user?.followers}
            </motion.div>
            <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {t('hero.stats.followers')}
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`text-center rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'glass-dark' : 'glass'}`}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            boxShadow: "0 20px 40px -15px rgba(249, 115, 22, 0.4)"
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10">
            <motion.div 
              className="flex items-center justify-center mb-3"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
            >
              <FaCodeBranch className="w-7 h-7 text-orange-400" />
            </motion.div>
            <motion.div 
              className="text-3xl font-bold text-orange-400 mb-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {totalForks}
            </motion.div>
            <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {t('hero.stats.totalForks')}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};