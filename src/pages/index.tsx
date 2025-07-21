import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { GitHubRepo } from "../types/github";
import { useGitHubData } from "../hooks/useGitHub";
import { useTranslation } from "next-i18next";
import { useLanyard } from "../hooks/useLanyard";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { SectionWrapper } from "../components/SectionWrapper";

const Terminal = lazy(() => import("../components/Terminal").then(module => ({ default: module.Terminal })));
const DiscordCard = lazy(() => import("../components/DiscordCard").then(module => ({ default: module.DiscordCard })));

function Home() {
  const { user, repos, isLoading, isError, error } = useGitHubData();
  const { t, i18n, ready } = useTranslation();

  const [typeText, setTypeText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);



  const DISCORD_USER_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID || "1220783094613672011";
  const { data: discordData } = useLanyard(DISCORD_USER_ID);



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

  const titles = useMemo(() => [
    t('hero.titles.fullstack'),
    t('hero.titles.enthusiast'),
    t('hero.titles.solver'),
    t('hero.titles.explorer'),
  ], [t]);

  useEffect(() => {
    if (!isClient || !titles.length) return;

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
  }, [textIndex, i18n.language, isClient, titles]);

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
      />

      {isClient && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${isDarkMode ? "bg-blue-400/15" : "bg-blue-600/10"
                }`}
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${10 + (i * 12)}%`,
              }}
              animate={{
                y: [-10, -40, -10],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 15 + (i * 2),
                repeat: Infinity,
                delay: i * 3,
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
        <SectionWrapper id="home" className="min-h-screen">
          <Hero
            isDarkMode={isDarkMode}
            user={user || null}
            typeText={typeText}
            totalStars={totalStars}
            totalForks={totalForks}
            isClient={isClient}
            getCreatedYear={getCreatedYear}
          />
        </SectionWrapper>

        <SectionWrapper id="about" className="py-16" animationDelay={0.1}>
          <About isDarkMode={isDarkMode} />
        </SectionWrapper>

        <SectionWrapper id="skills" className="py-16" animationDelay={0.2}>
          <Skills
            isDarkMode={isDarkMode}
            topLanguages={topLanguages}
            totalProjects={totalProjects}
          />
        </SectionWrapper>

        <SectionWrapper id="projects" className="py-16" animationDelay={0.3}>
          <Projects
            isDarkMode={isDarkMode}
            filteredRepos={filteredAndSortedRepos}
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
        </SectionWrapper>

        {discordData && (
          <SectionWrapper id="stats" className="py-16 mb-16" animationDelay={0.4}>
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
              <Suspense fallback={<div className={`animate-pulse h-32 w-80 rounded-lg ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}`} />}>
                <DiscordCard key={i18n.language} data={discordData} isDarkMode={isDarkMode} />
              </Suspense>
            </div>
          </SectionWrapper>
        )}

        <SectionWrapper id="terminal" className="py-16" animationDelay={0.5}>
          <Suspense fallback={<div className={`animate-pulse h-96 w-full rounded-lg ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}`} />}>
            <Terminal isDarkMode={isDarkMode} repos={repos} user={user || null} />
          </Suspense>
        </SectionWrapper>

        <SectionWrapper id="contact" className="py-16" animationDelay={0.6}>
          <Contact isDarkMode={isDarkMode} user={user || null} />
        </SectionWrapper>
      </motion.div>

      <Footer isDarkMode={isDarkMode} />

      <ScrollToTop isDarkMode={isDarkMode} />

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