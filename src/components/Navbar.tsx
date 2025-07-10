import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleTheme,
  activeSection,
  scrollToSection,
  scrollToTop,
}) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: t('nav.projects') },
    { id: 'stats', label: 'Stats' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleNavClick = (itemId: string) => {
    if (itemId === 'home') {
      scrollToTop();
    } else {
      scrollToSection(itemId);
    }
  };

  const getTextColor = (itemId: string) => {
    const isActive = activeSection === itemId;
    
    if (isActive) {
      return isDarkMode ? 'text-blue-400' : 'text-blue-600';
    }
    
    return isDarkMode ? 'text-gray-300' : 'text-gray-600';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode
        ? "bg-slate-900/80 border-slate-700/50"
        : "bg-white/80 border-gray-300/50"
        }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          className={`text-2xl font-bold cursor-pointer transition-colors duration-200 ${isDarkMode ? "text-white" : "text-gray-900"
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleNavClick('home')}
        >
          sw3do
        </motion.div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative px-3 py-2 text-sm font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className={`transition-colors duration-200 ${getTextColor(item.id)}`}
                >
                  {item.label}
                </span>
                
                <AnimatePresence mode="wait">
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, scaleX: 0, y: 2 }}
                      animate={{ opacity: 1, scaleX: 1, y: 0 }}
                      exit={{ opacity: 0, scaleX: 0, y: 2 }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-200 ${isDarkMode
              ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
              : "bg-gray-200 text-orange-600 hover:bg-gray-300"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.div>
          </motion.button>

          <LanguageSwitcher />
        </div>
      </div>
    </motion.nav>
  );
}; 