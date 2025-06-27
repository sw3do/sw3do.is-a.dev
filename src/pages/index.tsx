import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GitHubRepo } from "../types/github";
import { useGitHubData } from "../hooks/useGitHub";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import {
  FaGithub,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaStar,
  FaCodeBranch,
  FaUsers,
  FaFolder,
  FaMapMarkerAlt,
  FaLink,
  FaCalendarAlt,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaArrowUp,
  FaTrophy,
  FaRocket,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiRedis,
  SiVuedotjs,
  SiAngular,
  SiPhp,
  SiLaravel,
  SiCplusplus,
  SiRust,
  SiGo,
  SiDart,
  SiFlutter,
  SiAstro,
  SiKotlin,
  SiSwift,
  SiSharp,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiSvelte,
  SiNuxtdotjs,
  SiExpress,
  SiNestjs,
  SiSpring,
  SiMysql,
  SiFirebase,
  SiSupabase,
  SiPrisma,
  SiSocketdotio,
  SiElectron,
  SiReact,
  SiUnity,
  SiUnrealengine,
  SiBlender,
  SiSass,
  SiBootstrap,
  SiMui,
  SiChakraui,
  SiStyledcomponents,
  SiWebpack,
  SiVite,
  SiEslint,
  SiPrettier,
  SiJest,
  SiCypress,
  SiStorybook,
  SiFigma,
  SiAdobe,
  SiLinux,
  SiMacos,
  SiVim,
  SiGit,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiDigitalocean,
  SiAmazons3,
  SiAmazon,
  SiGooglecloud,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiScipy,
  SiJupyter,
  SiAnaconda,
  SiR,
  SiSolidity,
  SiWeb3Dotjs,
  SiEthereum
} from "react-icons/si";

const getLanguageIcon = (language: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    'JavaScript': <FaJsSquare className="w-5 h-5 text-yellow-400" />,
    'TypeScript': <SiTypescript className="w-5 h-5 text-blue-400" />,
    'React': <FaReact className="w-5 h-5 text-cyan-400" />,
    'Next.js': <SiNextdotjs className="w-5 h-5 text-white" />,
    'Node.js': <FaNodeJs className="w-5 h-5 text-green-400" />,
    'Python': <FaPython className="w-5 h-5 text-yellow-300" />,
    'HTML': <FaHtml5 className="w-5 h-5 text-orange-400" />,
    'CSS': <FaCss3Alt className="w-5 h-5 text-blue-400" />,
    'Vue': <SiVuedotjs className="w-5 h-5 text-green-400" />,
    'Angular': <SiAngular className="w-5 h-5 text-red-400" />,
    'PHP': <SiPhp className="w-5 h-5 text-purple-400" />,
    'Laravel': <SiLaravel className="w-5 h-5 text-red-400" />,
    'Go': <SiGo className="w-5 h-5 text-cyan-400" />,
    'Rust': <SiRust className="w-5 h-5 text-orange-400" />,
    'C++': <SiCplusplus className="w-5 h-5 text-blue-400" />,
    'Dart': <SiDart className="w-5 h-5 text-blue-500" />,
    'Flutter': <SiFlutter className="w-5 h-5 text-blue-500" />,
    'Astro': <SiAstro className="w-5 h-5 text-purple-500" />,
    'Kotlin': <SiKotlin className="w-5 h-5 text-purple-600" />,
    'Swift': <SiSwift className="w-5 h-5 text-orange-500" />,
    'C#': <SiSharp className="w-5 h-5 text-purple-500" />,
    'Django': <SiDjango className="w-5 h-5 text-green-600" />,
    'Flask': <SiFlask className="w-5 h-5 text-gray-600" />,
    'FastAPI': <SiFastapi className="w-5 h-5 text-green-500" />,
    'Svelte': <SiSvelte className="w-5 h-5 text-orange-500" />,
    'Nuxt.js': <SiNuxtdotjs className="w-5 h-5 text-green-500" />,
    'Express': <SiExpress className="w-5 h-5 text-gray-600" />,
    'NestJS': <SiNestjs className="w-5 h-5 text-red-500" />,
    'Spring': <SiSpring className="w-5 h-5 text-green-600" />,
    'MongoDB': <SiMongodb className="w-5 h-5 text-green-400" />,
    'PostgreSQL': <SiPostgresql className="w-5 h-5 text-blue-400" />,
    'MySQL': <SiMysql className="w-5 h-5 text-blue-600" />,
    'Firebase': <SiFirebase className="w-5 h-5 text-yellow-500" />,
    'Supabase': <SiSupabase className="w-5 h-5 text-green-500" />,
    'Prisma': <SiPrisma className="w-5 h-5 text-indigo-500" />,
    'Docker': <SiDocker className="w-5 h-5 text-blue-400" />,
    'Kubernetes': <SiKubernetes className="w-5 h-5 text-blue-400" />,
    'GraphQL': <SiGraphql className="w-5 h-5 text-pink-400" />,
    'Redis': <SiRedis className="w-5 h-5 text-red-400" />,
    'Socket.io': <SiSocketdotio className="w-5 h-5 text-gray-600" />,
    'TailwindCSS': <SiTailwindcss className="w-5 h-5 text-teal-400" />,
    'Sass': <SiSass className="w-5 h-5 text-pink-500" />,
    'Bootstrap': <SiBootstrap className="w-5 h-5 text-purple-600" />,
    'MUI': <SiMui className="w-5 h-5 text-blue-500" />,
    'Chakra UI': <SiChakraui className="w-5 h-5 text-teal-500" />,
    'Styled Components': <SiStyledcomponents className="w-5 h-5 text-pink-500" />,
    'Electron': <SiElectron className="w-5 h-5 text-teal-400" />,
    'React Native': <SiReact className="w-5 h-5 text-cyan-500" />,
    'Unity': <SiUnity className="w-5 h-5 text-gray-600" />,
    'Unreal Engine': <SiUnrealengine className="w-5 h-5 text-blue-600" />,
    'Blender': <SiBlender className="w-5 h-5 text-orange-500" />,
    'Webpack': <SiWebpack className="w-5 h-5 text-blue-500" />,
    'Vite': <SiVite className="w-5 h-5 text-purple-500" />,
    'ESLint': <SiEslint className="w-5 h-5 text-purple-600" />,
    'Prettier': <SiPrettier className="w-5 h-5 text-gray-600" />,
    'Jest': <SiJest className="w-5 h-5 text-red-500" />,
    'Cypress': <SiCypress className="w-5 h-5 text-gray-600" />,
    'Storybook': <SiStorybook className="w-5 h-5 text-pink-500" />,
    'Figma': <SiFigma className="w-5 h-5 text-purple-500" />,
    'Adobe': <SiAdobe className="w-5 h-5 text-red-500" />,
    'Linux': <SiLinux className="w-5 h-5 text-yellow-500" />,
    'macOS': <SiMacos className="w-5 h-5 text-gray-600" />,
    'Vim': <SiVim className="w-5 h-5 text-green-500" />,
    'Git': <SiGit className="w-5 h-5 text-orange-500" />,
    'GitHub': <SiGithub className="w-5 h-5 text-gray-600" />,
    'GitLab': <SiGitlab className="w-5 h-5 text-orange-600" />,
    'Bitbucket': <SiBitbucket className="w-5 h-5 text-blue-600" />,
    'Vercel': <SiVercel className="w-5 h-5 text-white" />,
    'Netlify': <SiNetlify className="w-5 h-5 text-teal-500" />,
    'Heroku': <SiHeroku className="w-5 h-5 text-purple-600" />,
    'DigitalOcean': <SiDigitalocean className="w-5 h-5 text-blue-500" />,
    'AWS S3': <SiAmazons3 className="w-5 h-5 text-orange-500" />,
    'AWS': <SiAmazon className="w-5 h-5 text-orange-500" />,
    'Google Cloud': <SiGooglecloud className="w-5 h-5 text-blue-500" />,
    'TensorFlow': <SiTensorflow className="w-5 h-5 text-orange-500" />,
    'PyTorch': <SiPytorch className="w-5 h-5 text-red-500" />,
    'OpenCV': <SiOpencv className="w-5 h-5 text-green-500" />,
    'NumPy': <SiNumpy className="w-5 h-5 text-blue-500" />,
    'Pandas': <SiPandas className="w-5 h-5 text-purple-500" />,
    'SciPy': <SiScipy className="w-5 h-5 text-blue-600" />,
    'Jupyter': <SiJupyter className="w-5 h-5 text-orange-500" />,
    'Anaconda': <SiAnaconda className="w-5 h-5 text-green-500" />,
    'R': <SiR className="w-5 h-5 text-blue-500" />,
    'Solidity': <SiSolidity className="w-5 h-5 text-gray-600" />,
    'Web3.js': <SiWeb3Dotjs className="w-5 h-5 text-orange-500" />,
    'Ethereum': <SiEthereum className="w-5 h-5 text-blue-600" />,
  };

  return iconMap[language] || <FaCode className="w-5 h-5 text-gray-400" />;
};

export default function Home() {
  const { user, repos, isLoading, isError, error } = useGitHubData();
  const { t, i18n, ready } = useTranslation();
  
  const [typeText, setTypeText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const { languages, totalStars, totalForks } = useMemo(() => {
    const langStats: { [key: string]: number } = {};
    let stars = 0;
    let forks = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        langStats[repo.language] = (langStats[repo.language] || 0) + 1;
      }
      stars += repo.stargazers_count;
      forks += repo.forks_count;
    });

    return {
      languages: langStats,
      totalStars: stars,
      totalForks: forks,
    };
  }, [repos]);

  const achievements = [
    { icon: <FaTrophy className="w-6 h-6 text-yellow-400" />, titleKey: "achievements.items.problemSolver.title", descKey: "achievements.items.problemSolver.desc" },
    { icon: <FaRocket className="w-6 h-6 text-blue-400" />, titleKey: "achievements.items.fastLearner.title", descKey: "achievements.items.fastLearner.desc" },
    { icon: <FaUsers className="w-6 h-6 text-green-400" />, titleKey: "achievements.items.teamPlayer.title", descKey: "achievements.items.teamPlayer.desc" },
    { icon: <FaCode className="w-6 h-6 text-purple-400" />, titleKey: "achievements.items.cleanCode.title", descKey: "achievements.items.cleanCode.desc" }
  ];

      const experiences = [
    {
      year: "2025",
      titleKey: "experience.items.animeEly.title",
      companyKey: "experience.items.animeEly.company",
      descriptionKey: "experience.items.animeEly.description",
      technologies: ["Next.js", "TailwindCSS", "Express", "MongoDB"]
    },
    {
      year: "2025",
      titleKey: "experience.items.fastDb.title",
      companyKey: "experience.items.fastDb.company",
      descriptionKey: "experience.items.fastDb.description",
      technologies: ["C++", "Node.js", "TypeScript", "Prisma"]
    },
    {
      year: "2025",
      titleKey: "experience.items.discordBot.title",
      companyKey: "experience.items.discordBot.company",
      descriptionKey: "experience.items.discordBot.description",
      technologies: ["TypeScript", "JavaScript", "Discord.js"]
    },
    {
      year: "2025",
      titleKey: "experience.items.mobileApps.title",
      companyKey: "experience.items.mobileApps.company",
      descriptionKey: "experience.items.mobileApps.description",
      technologies: ["React Native", "Expo", "Python", "PyQt5"]
    },
    {
      year: "2025",
      titleKey: "experience.items.rustDev.title",
      companyKey: "experience.items.rustDev.company",
      descriptionKey: "experience.items.rustDev.description",
      technologies: ["Rust", "API", "Crates.io"]
    }
  ];

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, url: `https://github.com/${user?.login}`, label: "GitHub" },
    { icon: <FaTwitter className="w-5 h-5" />, url: "https://x.com/sw3doo", label: "X" },
    { icon: <FaEnvelope className="w-5 h-5" />, url: "mailto:sw3d0o@gmail.com", label: "Email" },
    { icon: <FaInstagram className="w-5 h-5" />, url: "https://www.instagram.com/sw3doo", label: "Instagram" }
  ];

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

  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  useEffect(() => {
    const filterAndSortRepos = () => {
      let filtered = repos;

      if (selectedFilter !== "all") {
        filtered = filtered.filter(repo =>
          repo.language?.toLowerCase() === selectedFilter.toLowerCase()
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(repo =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (showFeaturedOnly) {
        filtered = filtered.filter(repo => repo.stargazers_count > 0);
      }

      const sorted = [...filtered].sort((a, b) => {
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

      setFilteredRepos(sorted);
    };

    filterAndSortRepos();
  }, [repos, selectedFilter, sortBy, searchTerm, showFeaturedOnly]);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    if (!isClient) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const getCreatedYear = () => {
    if (!isClient || !user?.created_at) return '';
    return new Date(user.created_at).getFullYear();
  };



  if (!isClient || !ready) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
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
            className={`w-16 h-16 border-4 rounded-full mx-auto mb-4 ${
              isDarkMode 
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
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
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
            className={`w-16 h-16 border-4 rounded-full mx-auto mb-4 ${
              isDarkMode 
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
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black" 
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`text-2xl font-bold p-8 rounded-lg backdrop-blur-sm border ${
            isDarkMode 
              ? "text-white bg-red-800/30 border-red-700/50" 
              : "text-red-800 bg-red-100/80 border-red-300/60"
          }`}
        >
          {error?.message || t('error')}
        </motion.div>
      </div>
    );
  }

  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-300 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDarkMode 
            ? "bg-slate-900/80 border-slate-700/50" 
            : "bg-white/80 border-gray-300/50"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            sw3do
          </motion.div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <a href="#home" className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}>{t('nav.home')}</a>
              <a href="#about" className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}>{t('nav.about')}</a>
              <a href="#projects" className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}>{t('nav.projects')}</a>
              <a href="#contact" className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}>{t('nav.contact')}</a>
            </div>
            
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? "bg-slate-800 hover:bg-slate-700 text-yellow-400" 
                  : "bg-gray-200 hover:bg-gray-300 text-orange-600"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.button>
            
            <LanguageSwitcher />
          </div>
        </div>
      </motion.nav>

      {/* Floating Particles Background */}
      {isClient && (
        <div className="fixed inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDarkMode ? "bg-blue-400/30" : "bg-blue-600/20"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
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
        style={{ paddingTop: '6rem' }}
      >
        <motion.div
          id="home"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            {/* Animated Background Rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-sm" />
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-44 h-44 rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-md" />
            </motion.div>

            {/* Main Profile Container */}
            <div className="relative">
              {/* Gradient Border */}
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-75"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Profile Image */}
              <motion.div
                className="relative bg-slate-900 rounded-full p-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src={user?.avatar_url}
                  alt="Profile"
                  className="w-40 h-40 rounded-full shadow-2xl"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.6 }}
                />

                {/* Inner Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/20 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>


                          {/* Floating Particles */}
            {isClient && [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
                style={{
                  top: `${20 + Math.sin(i * 60) * 60}%`,
                  left: `${20 + Math.cos(i * 60) * 60}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
            </div>

            {/* Bottom Glow Effect */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-blue-500/20 rounded-full blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <motion.div
            className="relative mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.h1
              className={`text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? "from-blue-400 via-white to-cyan-400" 
                  : "from-blue-600 via-gray-800 to-cyan-600"
              }`}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% auto" }}
            >
              {user?.name || "sw3do"}
            </motion.h1>

            {/* Holographic Lines */}
            <motion.div
              className="absolute -left-4 top-1/2 w-2 h-0.5 bg-blue-400"
              animate={{
                width: [8, 40, 8],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute -right-4 top-1/2 w-2 h-0.5 bg-cyan-400"
              animate={{
                width: [8, 35, 8],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          <motion.p
            className={`text-xl mb-4 max-w-2xl mx-auto transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {user?.bio || t('hero.bio')}
          </motion.p>

          {/* Typing Effect */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={`text-2xl font-mono min-h-[2rem] flex items-center justify-center transition-colors duration-300 ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}>
              <span className="mr-1">&gt;</span>
              <span>{typeText}</span>
              <motion.span
                className={`inline-block w-0.5 h-6 ml-1 transition-colors duration-300 ${
                  isDarkMode ? "bg-blue-400" : "bg-blue-600"
                }`}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-400"
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
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className={`text-center rounded-xl p-6 border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50" 
                  : "bg-white/80 border-gray-300/50 hover:border-blue-500/50"
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
            >
              <div className="flex items-center justify-center mb-2">
                <FaFolder className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">{user?.public_repos}</div>
              <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t('hero.stats.repositories')}</div>
            </motion.div>

            <motion.div
              className={`text-center rounded-xl p-6 border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-slate-800/50 border-slate-700/50 hover:border-green-500/50" 
                  : "bg-white/80 border-gray-300/50 hover:border-green-500/50"
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(34, 197, 94, 0.3)" }}
            >
              <div className="flex items-center justify-center mb-2">
                <FaStar className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-1">{totalStars}</div>
              <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t('hero.stats.totalStars')}</div>
            </motion.div>

            <motion.div
              className={`text-center rounded-xl p-6 border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50" 
                  : "bg-white/80 border-gray-300/50 hover:border-purple-500/50"
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
            >
              <div className="flex items-center justify-center mb-2">
                <FaUsers className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-1">{user?.followers}</div>
              <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t('hero.stats.followers')}</div>
            </motion.div>

            <motion.div
              className={`text-center rounded-xl p-6 border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-slate-800/50 border-slate-700/50 hover:border-orange-500/50" 
                  : "bg-white/80 border-gray-300/50 hover:border-orange-500/50"
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.3)" }}
            >
              <div className="flex items-center justify-center mb-2">
                <FaCodeBranch className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-orange-400 mb-1">{totalForks}</div>
              <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t('hero.stats.totalForks')}</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          id="about"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('achievements.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('achievements.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)"
                }}
              >
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t(achievement.titleKey)}
                </h3>
                <p className="text-gray-400 text-sm">
                  {t(achievement.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode 
                  ? "from-blue-400 via-cyan-400 to-blue-500" 
                  : "from-blue-600 via-cyan-600 to-blue-700"
              }`}>
                {t('experience.title')}
              </h2>
              
              {/* Simple decorative lines */}
              <div className="absolute -left-6 top-1/2 w-4 h-0.5 bg-blue-400 opacity-60" />
              <div className="absolute -right-6 top-1/2 w-4 h-0.5 bg-cyan-400 opacity-60" />
            </div>
            
            <p className={`max-w-2xl mx-auto transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('experience.subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Simple Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent opacity-30" />
            
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.15, duration: 0.5 }}
                  className={`relative mb-12 last:mb-0 ${
                    isEven ? "md:pr-1/2" : "md:pl-1/2 md:text-right"
                  }`}
                >
                  {/* Simple Timeline Node */}
                  <div className={`absolute ${
                    isEven 
                      ? "left-8 md:right-0 md:left-auto md:transform md:translate-x-1/2" 
                      : "left-8 md:left-0 md:transform md:-translate-x-1/2"
                  } top-6 md:top-8 z-20`}>
                    
                    {/* Simple node */}
                    <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex flex-col items-center justify-center shadow-md border-2 border-white/20 transition-transform duration-200 hover:scale-105">
                      <span className="text-white font-bold text-xs leading-none">{exp.year}</span>
                      <div className="w-1 h-1 bg-white rounded-full mt-1 opacity-80"></div>
                    </div>
                    
                    {/* Simple connecting line */}
                    <div className={`absolute top-6 ${
                      isEven 
                        ? "left-12 w-6 md:w-8" 
                        : "left-12 w-6 md:w-8"
                    } h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-40`} />
                  </div>
                  
                  {/* Experience Card */}
                  <div className={`ml-20 md:ml-0 ${!isEven ? "md:mr-20" : ""}`}>
                    <div className={`relative rounded-xl p-6 border backdrop-blur-sm transition-all duration-200 hover:border-blue-500/50 ${
                      isDarkMode 
                        ? "bg-slate-800/60 border-slate-700/50" 
                        : "bg-white/80 border-gray-300/50"
                    }`}>
                      
                      {/* Content */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {t(exp.titleKey)}
                          </h3>
                          <p className="text-blue-500 font-semibold text-sm mb-1">
                            {t(exp.companyKey)}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              index === 0 ? "bg-green-400" : "bg-gray-400"
                            }`}></div>
                            {index === 0 ? "Current" : "Completed"}
                          </div>
                        </div>
                      </div>

                      <p className={`mb-4 text-sm leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {t(exp.descriptionKey)}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
                              isDarkMode
                                ? "bg-blue-900/40 text-blue-300 border-blue-700/50 hover:bg-blue-800/60"
                                : "bg-blue-100/80 text-blue-700 border-blue-300/50 hover:bg-blue-200/80"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Simple achievement badge */}
                  {index < 2 && (
                    <div className={`absolute ${
                      isEven ? "top-4 right-4" : "top-4 left-4"
                    } z-30`}>
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                        ⭐ Featured
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* End of timeline decoration */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 bottom-0 w-1 h-8 bg-gradient-to-t from-transparent to-blue-400 opacity-30" />
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('skills.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('skills.subtitle')}
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topLanguages.map(([language, count], index) => {
                const totalProjects = Object.values(languages).reduce((a, b) => a + b, 0);
                const percentage = Math.round((count / totalProjects) * 100);

                return (
                  <motion.div
                    key={language}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)"
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getLanguageIcon(language)}
                        <span className="text-lg font-semibold text-white">{language}</span>
                      </div>
                      <div className="text-sm font-bold text-blue-400">
                        {percentage}%
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>{count} {t('skills.projects')}</span>
                        <span>{totalProjects} {t('skills.total')}</span>
                      </div>

                      <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 1.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Skills */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-12 text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                {t('skills.otherTech')}
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API', 'Microservices', 'CI/CD', 'Dart', 'Flutter', 'Astro', 'Kotlin', 'Swift', 'C#', 'Svelte', 'Nuxt.js', 'Express', 'NestJS', 'Spring', 'MySQL', 'Firebase', 'Supabase', 'Prisma', 'Socket.io', 'React Native', 'Electron', 'Unity', 'Blender', 'Webpack', 'Vite', 'Jest', 'Cypress', 'Storybook', 'Figma', 'Linux', 'Vim', 'GitLab', 'Vercel', 'Netlify', 'Heroku', 'TensorFlow', 'PyTorch', 'OpenCV', 'NumPy', 'Pandas', 'Jupyter', 'Solidity', 'Web3.js', 'Ethereum'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.2 + index * 0.05 }}
                    className="px-4 py-2 bg-slate-700/50 text-gray-300 rounded-full text-sm border border-slate-600/50 hover:border-blue-500/50 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          id="projects"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              {t('projects.subtitle')}
            </p>

            {/* Advanced Controls */}
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder={t('projects.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none transition-colors"
                />
                <FaCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Controls Row */}
              <div className="flex flex-wrap justify-center gap-4 items-center">
                
                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">{t('projects.sortBy')}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg text-white text-sm focus:border-blue-500/50 focus:outline-none"
                  >
                    <option value="updated">{t('projects.sortOptions.updated')}</option>
                    <option value="stars">{t('projects.sortOptions.stars')}</option>
                    <option value="forks">{t('projects.sortOptions.forks')}</option>
                    <option value="created">{t('projects.sortOptions.created')}</option>
                    <option value="name">{t('projects.sortOptions.name')}</option>
                  </select>
                </div>

                {/* Featured Toggle */}
                <button
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-2 ${
                    showFeaturedOnly
                      ? "bg-yellow-500 text-black shadow-lg"
                      : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                  }`}
                >
                  <FaStar className="w-3 h-3" />
                  <span>{t('projects.featuredOnly')}</span>
                </button>
              </div>

              {/* Language Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    selectedFilter === "all"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                  }`}
                >
                  {t('projects.all')} ({repos.length})
                </button>
                {topLanguages.slice(0, 6).map(([language, count]) => (
                  <button
                    key={language}
                    onClick={() => setSelectedFilter(language)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-2 ${
                      selectedFilter === language
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                    }`}
                  >
                    {getLanguageIcon(language)}
                    <span>{language} ({count})</span>
                  </button>
                ))}
              </div>

              {/* Results Info */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  {t('projects.showing', { count: filteredRepos.length, total: repos.length })}
                  {searchTerm && t('projects.searchFor', { term: searchTerm })}
                  {selectedFilter !== "all" && t('projects.inLanguage', { language: selectedFilter })}
                  {showFeaturedOnly && ` ${t('projects.featuredOnlyText')}`}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredRepos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('projects.noProjects.title')}</h3>
            <p className="text-gray-400 mb-6">
              {t('projects.noProjects.subtitle')}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("all");
                setShowFeaturedOnly(false);
              }}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {t('projects.noProjects.clearFilters')}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRepos.slice(0, 12).map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.9 + index * 0.05 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)"
                }}
                className="group bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <FaFolder className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <motion.h3
                          className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          {repo.name}
                        </motion.h3>
                        <p className="text-xs text-gray-400">
                          {t('projects.updated', { date: formatDate(repo.updated_at) })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Stars indicator */}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <FaStar className="w-3 h-3" />
                        <span className="text-sm font-medium">{repo.stargazers_count}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {repo.description || t('projects.noDescription')}
                  </p>

                  {/* Language & Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {repo.language && (
                        <div className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 rounded-full">
                          {getLanguageIcon(repo.language)}
                          <span className="text-xs text-gray-300">{repo.language}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      {repo.forks_count > 0 && (
                        <div className="flex items-center space-x-1">
                          <FaCodeBranch className="w-3 h-3" />
                          <span>{repo.forks_count}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>{t('projects.active')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 border border-blue-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>{t('projects.viewCode')}</span>
                    </motion.a>
                    
                    {repo.homepage && (
                      <motion.a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white rounded-lg text-sm transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredRepos.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open(`https://github.com/${user?.login}?tab=repositories`, '_blank');
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-600 flex items-center space-x-3 mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGithub className="w-5 h-5" />
              <span>{t('projects.viewAll', { count: repos.length })}</span>
            </motion.button>
          </motion.div>
        )}

        {/* Social Media Section */}
        <motion.div
          id="contact"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-16 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('social.title')}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
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
                  className="flex items-center space-x-4 p-6 bg-slate-800/60 rounded-xl border border-slate-700/50 hover:border-blue-500/50 backdrop-blur-sm transition-all duration-300 group"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)"
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {link.label === "GitHub" && t('social.descriptions.github')}
                      {link.label === "LinkedIn" && t('social.descriptions.linkedin')}
                      {link.label === "X" && t('social.descriptions.twitter')}
                      {link.label === "Email" && t('social.descriptions.email')}
                      {link.label === "Instagram" && t('social.descriptions.instagram')}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-white transition-colors">
                    →
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>



        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.1 }}
          className="text-center mt-16"
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
      </motion.div>

      {/* Footer */}
      <footer className={`border-t mt-20 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-slate-900/80 border-slate-700/50" 
          : "bg-gray-100/80 border-gray-300/50"
      }`}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>sw3do</h3>
              <p className={`mb-4 max-w-md transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>{t('footer.technologies')}</h4>
              <ul className="space-y-2">
                <li><span className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>React & Next.js</span></li>
                <li><span className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>Node.js & Express</span></li>
                <li><span className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>TypeScript</span></li>
                <li><span className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>MongoDB & PostgreSQL</span></li>
              </ul>
            </div>
          </div>

          <div className={`border-t mt-8 pt-8 text-center transition-colors duration-300 ${
            isDarkMode ? "border-slate-700/50" : "border-gray-300/50"
          }`}>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              {t('footer.copyright')} {' '}
              <span className="text-red-400">❤️</span> {t('footer.and')} {' '}
              <span className="text-yellow-400">☕</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg z-50 flex items-center justify-center transition-colors duration-300 ${
            isDarkMode 
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
      )}

      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-slate-600 to-gray-700"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </div>
  );
}