import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import {
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaInstagram,
} from 'react-icons/fa';
import { GitHubUser } from '../types/github';

interface ContactProps {
  isDarkMode: boolean;
  user: GitHubUser | null;
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode, user }) => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, url: `https://github.com/${user?.login}`, label: "GitHub" },
    { icon: <FaTwitter className="w-5 h-5" />, url: "https://x.com/sw3doo", label: "X" },
    { icon: <FaEnvelope className="w-5 h-5" />, url: "mailto:sw3d0o@gmail.com", label: "Email" },
    { icon: <FaInstagram className="w-5 h-5" />, url: "https://www.instagram.com/sw3doo", label: "Instagram" }
  ];

  return (
    <>
      <motion.div
        id="contact"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 4.2 }}
        className="mt-8 mb-8"
      >
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {t('social.title')}
          </h2>
          <p className={`max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {t('social.subtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.7 + index * 0.1 }}
                className={`flex items-center space-x-4 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 group ${isDarkMode
                  ? "bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/50"
                  : "bg-white/80 border border-gray-200/50 hover:border-blue-500/50 shadow-lg"
                  }`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)"
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold group-hover:text-blue-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {link.label}
                  </h3>
                  <p className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {link.label === "GitHub" && t('social.descriptions.github')}
                    {link.label === "LinkedIn" && t('social.descriptions.linkedin')}
                    {link.label === "X" && t('social.descriptions.twitter')}
                    {link.label === "Email" && t('social.descriptions.email')}
                    {link.label === "Instagram" && t('social.descriptions.instagram')}
                  </p>
                </div>
                <div className={`flex-shrink-0 group-hover:text-blue-400 transition-colors ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-blue-400"}`}>
                  →
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.1 }}
        className="text-center mt-8"
      >
        <motion.a
          href={`https://github.com/${user?.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold rounded-full hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaGithub className="w-5 h-5 mr-2" />
          {t('social.githubProfile')}
        </motion.a>
      </motion.div>
    </>
  );
};