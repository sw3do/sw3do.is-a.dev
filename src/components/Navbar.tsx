import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useScroll } from '../hooks/useScroll';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleTheme,
}) => {
  const { t } = useTranslation();
  const { activeSection, scrollToSection, scrollToTop } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-900/80 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        } backdrop-blur-xl border-b`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className={`text-2xl font-bold cursor-pointer transition-all duration-200 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-blue-400 to-cyan-400 text-transparent bg-clip-text' 
                  : 'from-blue-600 to-cyan-600 text-transparent bg-clip-text'
              }`}
              whileHover={{ 
                scale: 1.05,
                filter: 'brightness(1.2)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleNavClick('home')}
            >
              sw3do
            </motion.div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                    activeSection === item.id
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 shadow-lg shadow-blue-500/25'
                        : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 shadow-lg shadow-blue-500/25'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  <AnimatePresence>
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full"
                        layoutId="activeTab"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <motion.div
                    className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10'
                        : 'bg-gradient-to-r from-blue-500/5 to-cyan-500/5'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                onClick={toggleTheme}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 text-yellow-400 hover:bg-gray-700/70 hover:shadow-lg hover:shadow-yellow-400/20 border border-gray-700/50"
                    : "bg-gray-100/50 text-orange-600 hover:bg-gray-200/70 hover:shadow-lg hover:shadow-orange-600/20 border border-gray-200/50"
                }`}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDarkMode ? 0 : 180 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {isDarkMode ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
                </motion.div>
              </motion.button>

              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>

              <motion.button
                onClick={toggleMobileMenu}
                className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white border border-gray-700/50"
                    : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900 border border-gray-200/50"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMobileMenuOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-16 left-0 right-0 z-40 lg:hidden ${
              isDarkMode
                ? 'bg-gray-900/95 border-gray-700/50'
                : 'bg-white/95 border-gray-200/50'
            } backdrop-blur-xl border-b shadow-xl`}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 shadow-lg'
                          : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 shadow-lg'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-gray-700/30"
                >
                  <LanguageSwitcher />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};