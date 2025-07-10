import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

interface ScrollToTopProps {
  isDarkMode: boolean;
  showScrollTop: boolean;
  scrollToTop: () => void;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  isDarkMode,
  showScrollTop,
  scrollToTop,
}) => {
  if (!showScrollTop) return null;

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg z-50 flex items-center justify-center transition-colors duration-300 ${isDarkMode
        ? "bg-blue-500 hover:bg-blue-600 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaArrowUp className="w-5 h-5" />
    </motion.button>
  );
}; 