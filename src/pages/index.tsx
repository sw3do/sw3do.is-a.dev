import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { GitHubRepo } from "../types/github";
import { useGitHubData } from "../hooks/useGitHub";
import { useTranslation } from "next-i18next";
import { useLanyard } from "../hooks/useLanyard";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Terminal } from "../components/Terminal";
import { DiscordCard } from "../components/DiscordCard";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";

function Home() {
  const { user, repos, isLoading, isError, error } = useGitHubData();
  const { t, i18n, ready } = useTranslation();

  const [typeText, setTypeText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const activeSection = useStoreState((state: { scroll: { activeSection: string } }) => state.scroll.activeSection);
  const showScrollTop = useStoreState((state: { scroll: { showScrollTop: boolean } }) => state.scroll.showScrollTop);
  const isScrolling = useStoreState((state: { scroll: { isScrolling: boolean } }) => state.scroll.isScrolling);
  
  const setActiveSection = useStoreActions((actions: { scroll: { setActiveSection: (payload: string) => void } }) => actions.scroll.setActiveSection);
  const setShowScrollTop = useStoreActions((actions: { scroll: { setShowScrollTop: (payload: boolean) => void } }) => actions.scroll.setShowScrollTop);
  const scrollToSection = useStoreActions((actions: { scroll: { scrollToSection: (sectionId: string) => void } }) => actions.scroll.scrollToSection);
  const scrollToTop = useStoreActions((actions: { scroll: { scrollToTop: () => void } }) => actions.scroll.scrollToTop);
  const cleanup = useStoreActions((actions: { scroll: { cleanup: () => void } }) => actions.scroll.cleanup);

  const DISCORD_USER_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID || "1220783094613672011";
  const { data: discordData } = useLanyard(DISCORD_USER_ID);

  const sections = useMemo(() => ['home', 'about', 'skills', 'projects', 'stats', 'terminal', 'contact'], []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    
    setShowScrollTop(scrollY > 400);

    if (isScrolling) return;

    if (scrollY < 300) {
      if (activeSection !== 'home') {
        setActiveSection('home');
      }
      return;
    }

    const viewportTop = scrollY;
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportTop + (viewportHeight / 2);
    
    let newActiveSection = 'home';
    let bestMatch = { distance: Infinity, coverage: 0 };

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const elementTop = element.offsetTop - 100;
      const elementHeight = element.offsetHeight;
      const elementBottom = elementTop + elementHeight;
      const elementCenter = elementTop + (elementHeight / 2);

      const overlapTop = Math.max(viewportTop, elementTop);
      const overlapBottom = Math.min(viewportTop + viewportHeight, elementBottom);
      const overlapHeight = Math.max(0, overlapBottom - overlapTop);
      const coverage = overlapHeight / viewportHeight;

      const distance = Math.abs(viewportCenter - elementCenter);

      const score = coverage * 2 - (distance / 1000);

      if (coverage > 0.3 && score > bestMatch.coverage - (bestMatch.distance / 1000)) {
        bestMatch = { distance, coverage };
        newActiveSection = sectionId;
      }
    });

    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [sections, isScrolling, activeSection, setActiveSection, setShowScrollTop]);

  const throttledScrollHandler = useCallback(() => {
    let ticking = false;

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const scrollHandler = throttledScrollHandler();
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    setTimeout(() => {
      handleScroll();
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [throttledScrollHandler, handleScroll]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    window.scrollTo(0, 0);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }, [isDarkMode]);

  const { languages, totalStars, totalForks, totalProjects } = useMemo(() => {
    const langStats: { [key: string]: number } = {};
    let stars = 0;
    let forks = 0;
    let projectCount = 0;

    repos.forEach((repo: GitHubRepo) => {
      if (repo.language) {
        langStats[repo.language] = (langStats[repo.language] || 0) + 1;
        projectCount++;
      }
      stars += repo.stargazers_count;
      forks += repo.forks_count;
    });

    return {
      languages: langStats,
      totalStars: stars,
      totalForks: forks,
      totalProjects: projectCount,
    };
  }, [repos]);

  useEffect(() => {
    if (!isClient) return;

    const titles = [
      t('hero.titles.fullstack'),
      t('hero.titles.enthusiast'),
      t('hero.titles.solver'),
      t('hero.titles.explorer'),
    ];

    const currentTitle = titles[textIndex];
    let currentChar = 0;

    const typeTimer = setInterval(() => {
      if (currentChar <= currentTitle.length) {
        setTypeText(currentTitle.slice(0, currentChar));
        currentChar++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % titles.length);
          setTypeText("");
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [textIndex, i18n.language, isClient, t]);

  const filteredAndSortedRepos = useMemo(() => {
    let filtered = repos;

    if (selectedFilter !== "all") {
      filtered = filtered.filter((repo: GitHubRepo) =>
        repo.language?.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((repo: GitHubRepo) =>
        repo.name.toLowerCase().includes(searchLower) ||
        repo.description?.toLowerCase().includes(searchLower)
      );
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter((repo: GitHubRepo) => repo.stargazers_count > 0);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "updated":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });
  }, [repos, selectedFilter, sortBy, searchTerm, showFeaturedOnly]);

  useEffect(() => {
    setFilteredRepos(filteredAndSortedRepos);
  }, [filteredAndSortedRepos]);

  const getCreatedYear = useCallback(() => {
    if (!isClient || !user?.created_at) return '';
    return new Date(user.created_at).getFullYear().toString();
  }, [isClient, user?.created_at]);

  const topLanguages = useMemo(() =>
    Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
    , [languages]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  if (!isClient || !ready) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}>
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`w-16 h-16 border-4 rounded-full mx-auto mb-4 ${isDarkMode
              ? "border-gray-600 border-t-blue-500"
              : "border-gray-300 border-t-blue-600"
              }`}
          />
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}>
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`w-16 h-16 border-4 rounded-full mx-auto mb-4 ${isDarkMode
              ? "border-gray-600 border-t-blue-500"
              : "border-gray-300 border-t-blue-600"
              }`}
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            {t('loading')}
          </motion.p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`text-2xl font-bold p-8 rounded-lg backdrop-blur-sm border ${isDarkMode
            ? "text-white bg-red-800/30 border-red-700/50"
            : "text-red-800 bg-red-100/80 border-red-300/60"
            }`}
        >
          {error?.message || t('error')}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${isDarkMode
      ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black"
      : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        scrollToSection={(sectionId: string) => scrollToSection(sectionId)}
        scrollToTop={() => scrollToTop()}
      />

      {isClient && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${isDarkMode ? "bg-blue-400/20" : "bg-blue-600/15"
                }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: 'transform, opacity'
              }}
              animate={{
                y: [-20, -80, -20],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 py-12 relative z-10"
        style={{
          paddingTop: '6rem',
          willChange: 'opacity'
        }}
      >
        <div id="home">
          <Hero
            isDarkMode={isDarkMode}
            user={user || null}
            typeText={typeText}
            totalStars={totalStars}
            totalForks={totalForks}
            isClient={isClient}
            getCreatedYear={getCreatedYear}
          />
        </div>

        <div id="about">
          <About isDarkMode={isDarkMode} />
        </div>

        <div id="skills">
          <Skills
            isDarkMode={isDarkMode}
            topLanguages={topLanguages}
            totalProjects={totalProjects}
          />
        </div>

        <div id="projects">
          <Projects
            isDarkMode={isDarkMode}
            filteredRepos={filteredRepos}
            selectedFilter={selectedFilter}
            sortBy={sortBy}
            searchTerm={searchTerm}
            showFeaturedOnly={showFeaturedOnly}
            languages={languages}
            setSelectedFilter={setSelectedFilter}
            setSortBy={setSortBy}
            handleSearchChange={handleSearchChange}
            handleClearSearch={handleClearSearch}
            setShowFeaturedOnly={setShowFeaturedOnly}
          />
        </div>

        {discordData && (
          <motion.div
            id="stats"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.0 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
                  ? "from-indigo-400 via-purple-400 to-pink-400"
                  : "from-indigo-600 via-purple-600 to-pink-600"
                  }`}>
                  {t('discord.title')}
                </h2>
                <div className="absolute -left-6 top-1/2 w-4 h-0.5 bg-indigo-400 opacity-60" />
                <div className="absolute -right-6 top-1/2 w-4 h-0.5 bg-purple-400 opacity-60" />
              </div>
              <p className={`max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                {t('discord.subtitle')}
              </p>
            </div>

            <div className="flex justify-center w-full">
              <DiscordCard key={i18n.language} data={discordData} isDarkMode={isDarkMode} />
            </div>
          </motion.div>
        )}

        <div id="terminal">
          <Terminal isDarkMode={isDarkMode} repos={repos} user={user || null} />
        </div>

        <div id="contact">
          <Contact isDarkMode={isDarkMode} user={user || null} />
        </div>
      </motion.div>

      <Footer isDarkMode={isDarkMode} />

      <ScrollToTop
        isDarkMode={isDarkMode}
        showScrollTop={showScrollTop}
        scrollToTop={() => scrollToTop()}
      />

      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-slate-600 to-gray-700"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </div>
  );
}

export default React.memo(Home);

export async function getStaticProps({ locale }: { locale: string }) {
  const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}