import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import {
  FaStar,
  FaCodeBranch,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaSearch,
  FaTimes,
} from 'react-icons/fa';
import { getLanguageIcon } from '../utils/icons';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
}

interface ProjectsProps {
  isDarkMode: boolean;
  filteredRepos: Repository[];
  selectedFilter: string;
  sortBy: string;
  searchTerm: string;
  showFeaturedOnly: boolean;
  languages: { [key: string]: number };
  setSelectedFilter: (filter: string) => void;
  setSortBy: (sortBy: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  setShowFeaturedOnly: (show: boolean) => void;
}

const ProjectsComponent: React.FC<ProjectsProps> = ({
  isDarkMode,
  filteredRepos,
  selectedFilter,
  sortBy,
  searchTerm,
  showFeaturedOnly,
  languages,
  setSelectedFilter,
  setSortBy,
  handleSearchChange,
  handleClearSearch,
  setShowFeaturedOnly,
}) => {
  const { t } = useTranslation();

  const formatDate = useMemo(() => {
    return (dateString: string) => new Date(dateString).toLocaleDateString();
  }, []);

  const displayedRepos = useMemo(() => {
    return filteredRepos.slice(0, 12);
  }, [filteredRepos]);

  return (
    <motion.div
      id="projects"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.3 }}
      className="mb-8"
    >
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {t('projects.title')}
        </h2>
        <p className={`max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {t('projects.subtitle')}
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            <input
              type="text"
              placeholder={t('projects.searchPlaceholder')}
              value={searchTerm}
              onChange={handleSearchChange}
              className={`w-full pl-10 pr-10 py-3 rounded-lg border transition-all duration-300 ${isDarkMode
                ? "bg-slate-800/60 border-slate-700/50 text-white placeholder-gray-400 focus:border-blue-500/50"
                : "bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-blue-500/50"
                } focus:outline-none`}
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className={`px-4 py-3 rounded-lg border transition-all duration-300 ${isDarkMode
                ? "bg-slate-800/60 border-slate-700/50 text-white"
                : "bg-white/80 border-gray-300/50 text-gray-900"
                } focus:outline-none focus:border-blue-500/50`}
            >
              <option value="all">{t('projects.filters.all')}</option>
              {Object.keys(languages).map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-3 rounded-lg border transition-all duration-300 ${isDarkMode
                ? "bg-slate-800/60 border-slate-700/50 text-white"
                : "bg-white/80 border-gray-300/50 text-gray-900"
                } focus:outline-none focus:border-blue-500/50`}
            >
              <option value="updated">{t('projects.sort.updated')}</option>
              <option value="stars">{t('projects.sort.stars')}</option>
              <option value="forks">{t('projects.sort.forks')}</option>
              <option value="name">{t('projects.sort.name')}</option>
              <option value="created">{t('projects.sort.created')}</option>
            </select>

            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-4 py-3 rounded-lg border transition-all duration-300 ${showFeaturedOnly
                ? isDarkMode
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                  : "bg-blue-100/80 border-blue-500/50 text-blue-600"
                : isDarkMode
                  ? "bg-slate-800/60 border-slate-700/50 text-white hover:border-blue-500/50"
                  : "bg-white/80 border-gray-300/50 text-gray-900 hover:border-blue-500/50"
                }`}
            >
              ⭐ {t('projects.featured')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {displayedRepos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 + index * 0.1 }}
            className={`rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${isDarkMode ? 'glass-dark' : 'glass'}`}
            whileHover={{
              scale: 1.03,
              y: -8,
              boxShadow: "0 25px 50px -15px rgba(59, 130, 246, 0.4)"
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {repo.language && getLanguageIcon(repo.language)}
                  <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {repo.name}
                  </h3>
                </div>
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-slate-700/50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                    }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </motion.a>
              </div>

              <p className={`text-sm mb-4 line-clamp-3 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {repo.description || t('projects.noDescription')}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <FaStar className={`w-4 h-4 ${repo.stargazers_count > 0 ? "text-yellow-400" : isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                    <span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {repo.stargazers_count}
                    </span>
                  </div>
                <div className="flex items-center space-x-1">
                   <FaCodeBranch className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                   <span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                     {repo.forks_count}
                   </span>
                 </div>
               </div>
               <div className="flex items-center space-x-1 text-xs">
                 <FaCalendarAlt className={`w-3 h-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                 <span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                   {formatDate(repo.updated_at)}
                 </span>
               </div>
             </div>
           </div>
           </motion.div>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-4">🔍</div>
          <p className={`text-lg transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            {t('projects.noResults')}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export const Projects = React.memo(ProjectsComponent);