import React, { useMemo } from 'react';
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

const HeroComponent: React.FC<HeroProps> = ({
  isDarkMode,
  user,
  typeText,
  totalStars,
  totalForks,
  isClient,
  getCreatedYear,
}) => {
  const { t } = useTranslation();

  const floatingShapes = useMemo(() => {
    if (!isClient) return null;
    return [...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-2 h-2 ${isDarkMode ? 'bg-blue-400/15' : 'bg-blue-600/10'} rounded-full motion-safe`}
        style={{
          left: `${20 + (i * 20)}%`,
          top: `${20 + (i * 15)}%`,
        }}
        animate={{
          y: [-15, -30, -15],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6 + (i * 1),
          repeat: Infinity,
          delay: i * 1.5,
          ease: "easeInOut"
        }}
      />
    ));
  }, [isClient, isDarkMode]);

  const statsData = useMemo(() => [
    {
      icon: FaFolder,
      value: user?.public_repos,
      label: t('hero.stats.repositories'),
      color: 'blue',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      shadow: 'rgba(59, 130, 246, 0.4)'
    },
    {
      icon: FaStar,
      value: totalStars,
      label: t('hero.stats.totalStars'),
      color: 'green',
      gradient: 'from-green-500/10 to-emerald-500/10',
      shadow: 'rgba(34, 197, 94, 0.4)'
    },
    {
      icon: FaUsers,
      value: user?.followers,
      label: t('hero.stats.followers'),
      color: 'purple',
      gradient: 'from-purple-500/10 to-pink-500/10',
      shadow: 'rgba(168, 85, 247, 0.4)'
    },
    {
      icon: FaCodeBranch,
      value: totalForks,
      label: t('hero.stats.totalForks'),
      color: 'orange',
      gradient: 'from-orange-500/10 to-red-500/10',
      shadow: 'rgba(249, 115, 22, 0.4)'
    }
  ], [user, totalStars, totalForks, t]);

  return (
    <motion.div
      id="home"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center mb-8 relative"
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
        
        {floatingShapes}
        
        {/* Simplified gradient orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-xl opacity-40" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-xl opacity-30" />
      </div>

      <div className="relative inline-block mb-6">
        {/* Simplified rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 blur-sm" />
        </motion.div>

        <div className="relative">
          {/* Simplified gradient border */}
          <div className="absolute -inset-2 rounded-full opacity-50 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30" />

          {/* Glassmorphism container */}
          <motion.div
            className={`relative rounded-full p-2 motion-safe ${isDarkMode ? 'glass-ultra-dark' : 'glass-ultra'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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

            {/* Simplified overlay effect */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-t from-blue-500/20 via-transparent to-purple-500/15 opacity-40" />
          </motion.div>


        </div>

        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-blue-500/15 rounded-full blur-xl opacity-60" />
      </div>

      <motion.div
        className="relative mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1
          className={`text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent neon-glow ${
            isDarkMode
              ? "from-blue-400 via-white to-cyan-400"
              : "from-blue-600 via-gray-800 to-cyan-600"
            }`}
        >
          {user?.name || "sw3do"}
        </h1>

        <div className="absolute -left-4 top-1/2 w-8 h-0.5 bg-blue-400 opacity-60" />
        <div className="absolute -right-4 top-1/2 w-8 h-0.5 bg-cyan-400 opacity-60" />
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
        className="mb-4"
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
        className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-gray-400"
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
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className={`text-center rounded-2xl p-6 relative overflow-hidden transition-all duration-500 magnetic shimmer glow-effect motion-safe ${isDarkMode ? 'glass-ultra-dark shimmer-dark' : 'glass-ultra'}`}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: `0 20px 40px -15px ${stat.shadow}`
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0`}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center justify-center mb-3"
                  whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent className={`w-7 h-7 text-${stat.color}-400`} />
                </motion.div>
                <motion.div 
                  className={`text-3xl font-bold text-${stat.color}-400 mb-2`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export const Hero = React.memo(HeroComponent);