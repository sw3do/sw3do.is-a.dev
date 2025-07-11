import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useScroll } from '../hooks/useScroll';

interface ScrollToTopProps {
  isDarkMode: boolean;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ isDarkMode }) => {
  const { showScrollTop, scrollToTop, scrollProgress } = useScroll();

  if (!showScrollTop) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Progress ring */}
        <svg 
          className="absolute inset-0 w-12 h-12 transform -rotate-90"
          viewBox="0 0 36 36"
        >
          <path
            className={`${isDarkMode ? "stroke-gray-700" : "stroke-gray-300"}`}
            strokeWidth="2"
            fill="transparent"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={`${isDarkMode ? "stroke-blue-400" : "stroke-blue-600"}`}
            strokeWidth="2"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={`${scrollProgress}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        
        {/* Button */}
        <motion.button
          onClick={scrollToTop}
          className={`relative w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isDarkMode
              ? "bg-slate-800/90 hover:bg-slate-700/90 text-blue-400 border border-slate-600/50"
              : "bg-white/90 hover:bg-gray-50/90 text-blue-600 border border-gray-200/50"
          }`}
          whileHover={{ 
            scale: 1.1,
            boxShadow: isDarkMode 
              ? "0 8px 25px rgba(59, 130, 246, 0.3)" 
              : "0 8px 25px rgba(37, 99, 235, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-4 h-4" />
        </motion.button>
        
        {/* Tooltip */}
        <motion.div
          className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 border border-gray-700"
              : "bg-gray-900 text-gray-100 border border-gray-600"
          }`}
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          Scroll to Top ({scrollProgress}%)
          <div 
            className={`absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent ${
              isDarkMode ? "border-l-gray-800" : "border-l-gray-900"
            }`}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 