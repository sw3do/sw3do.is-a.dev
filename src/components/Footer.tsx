import React from 'react';
import { useTranslation } from 'next-i18next';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <footer className={`border-t mt-20 transition-colors duration-300 ${isDarkMode
      ? "bg-slate-900/95 border-slate-700/50 backdrop-blur-sm"
      : "bg-white/95 border-gray-200/60 shadow-lg backdrop-blur-sm"
      }`}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"
              }`}>sw3do</h3>
            <p className={`mb-4 max-w-md transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}>
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"
              }`}>{t('footer.technologies')}</h4>
            <ul className="space-y-2">
              <li><span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}>React & Next.js</span></li>
              <li><span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}>Node.js & Express</span></li>
              <li><span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}>TypeScript</span></li>
              <li><span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-700"
                }`}>MongoDB & PostgreSQL</span></li>
            </ul>
          </div>
        </div>

        <div className={`border-t mt-8 pt-8 text-center transition-colors duration-300 ${isDarkMode ? "border-slate-700/50" : "border-gray-200/60"
          }`}>
          <p className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-700"
            }`}>
            {t('footer.copyright')} {' '}
            <span className="text-red-400">❤️</span> {t('footer.and')} {' '}
            <span className="text-yellow-400">☕</span>
          </p>
        </div>
      </div>
    </footer>
  );
};