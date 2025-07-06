import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { GitHubRepo } from "../types/github";
import { useGitHubData } from "../hooks/useGitHub";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { DiscordCard } from "../components/DiscordCard";
import { useLanyard } from "../hooks/useLanyard";
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
  FaTerminal,
  FaPlay,
  FaFire,
  FaChartLine,
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

function Home() {
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

  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [gitHubStats, setGitHubStats] = useState<{ 
    totalContributions: number; 
    totalRepositories: number; 
    totalStars: number; 
    totalForks: number;
    totalEvents: number;
    recentActivity: Array<{
      type: string;
      repo: string;
      created_at: string;
      payload: { commits?: { message: string }[]; ref_type?: string; ref?: string };
    }>;
    contributionData: { weeks: Array<Array<{ date: string; contributions: number; level: number }>>; totalContributions: number };
  } | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isTerminalScrolledToBottom, setIsTerminalScrolledToBottom] = useState(true);
  
  const DISCORD_USER_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID || "1220783094613672011";
  const { data: discordData } = useLanyard(DISCORD_USER_ID);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
    
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) {
      setTerminalHistory([
        t('terminal.welcome'),
        t('terminal.subtitle'),
        ""
      ]);
    }
  }, [ready, t, i18n.language]);

  useEffect(() => {
    if (isTerminalScrolledToBottom) {
      const terminalElement = document.querySelector('.terminal-history');
      if (terminalElement) {
        terminalElement.scrollTop = terminalElement.scrollHeight;
      }
    }
  }, [terminalHistory, isTerminalScrolledToBottom]);

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

  const achievements = useMemo(() => [
    { icon: <FaTrophy className="w-6 h-6 text-yellow-400" />, titleKey: "achievements.items.problemSolver.title", descKey: "achievements.items.problemSolver.desc" },
    { icon: <FaRocket className="w-6 h-6 text-blue-400" />, titleKey: "achievements.items.fastLearner.title", descKey: "achievements.items.fastLearner.desc" },
    { icon: <FaUsers className="w-6 h-6 text-green-400" />, titleKey: "achievements.items.teamPlayer.title", descKey: "achievements.items.teamPlayer.desc" },
    { icon: <FaCode className="w-6 h-6 text-purple-400" />, titleKey: "achievements.items.cleanCode.title", descKey: "achievements.items.cleanCode.desc" }
  ], []);

  const experiences = useMemo(() => [
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
  ], []);

  const socialLinks = useMemo(() => [
    { icon: <FaGithub className="w-5 h-5" />, url: `https://github.com/${user?.login}`, label: "GitHub" },
    { icon: <FaTwitter className="w-5 h-5" />, url: "https://x.com/sw3doo", label: "X" },
    { icon: <FaEnvelope className="w-5 h-5" />, url: "mailto:sw3d0o@gmail.com", label: "Email" },
    { icon: <FaInstagram className="w-5 h-5" />, url: "https://www.instagram.com/sw3doo", label: "Instagram" }
  ], [user?.login]);

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

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          
          const sections = ['home', 'about', 'skills', 'projects', 'terminal', 'stats', 'contact'];
          const scrollPosition = window.scrollY + 100;
          
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetBottom = offsetTop + element.offsetHeight;
              
              if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                setActiveSection(section);
                break;
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

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

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const scrollToHome = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      document.documentElement.classList.add('smooth-scroll');
      
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        document.documentElement.classList.remove('smooth-scroll');
      }, 1000);
    }
  }, []);

  const getCreatedYear = useCallback(() => {
    if (!isClient || !user?.created_at) return '';
    return new Date(user.created_at).getFullYear();
  }, [isClient, user?.created_at]);

  const generateContributionData = useCallback((events: { type: string; created_at: string }[]) => {
    const contributionMap = new Map<string, number>();
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    events.forEach((event: { type: string; created_at: string }) => {
      const eventDate = new Date(event.created_at);
      if (eventDate >= oneYearAgo) {
        const dateKey = eventDate.toISOString().split('T')[0];
        const contributionTypes = ['PushEvent', 'CreateEvent', 'IssuesEvent', 'PullRequestEvent', 'WatchEvent', 'ForkEvent'];
        
        if (contributionTypes.includes(event.type)) {
          contributionMap.set(dateKey, (contributionMap.get(dateKey) || 0) + 1);
        }
      }
    });

    const weeks = [];
    for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
      const week = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const date = new Date(now.getTime() - (52 - weekIndex) * 7 * 24 * 60 * 60 * 1000 - (6 - dayIndex) * 24 * 60 * 60 * 1000);
        const dateKey = date.toISOString().split('T')[0];
        const contributions = contributionMap.get(dateKey) || 0;
        
        week.push({
          date: dateKey,
          contributions,
          level: Math.min(Math.floor(contributions / 2), 4)
        });
      }
      weeks.push(week);
    }

    const totalContributions = Array.from(contributionMap.values()).reduce((sum, count) => sum + count, 0);
    
    return { weeks, totalContributions };
  }, []);

  const terminalStats = useMemo(() => ({
    totalProjects: repos.length,
    publicRepos: user?.public_repos || 0,
    totalStars: repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0),
    totalForks: repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0)
  }), [repos, user?.public_repos]);

  const terminalCommands = useMemo(() => ({
    help: () => [
      t('terminal.availableCommands'),
      `  help          - ${t('terminal.commands.help')}`,
      `  about         - ${t('terminal.commands.about')}`,
      `  skills        - ${t('terminal.commands.skills')}`,
      `  projects      - ${t('terminal.commands.projects')}`,
      `  contact       - ${t('terminal.commands.contact')}`,
      `  clear         - ${t('terminal.commands.clear')}`,
      `  whoami        - ${t('terminal.commands.whoami')}`,
      `  date          - ${t('terminal.commands.date')}`,
      `  ls            - ${t('terminal.commands.ls')}`,
      `  cat <file>    - ${t('terminal.commands.cat')} (try: cat readme.md)`,
      ""
    ],
    about: () => [
      "sw3do - Full Stack Developer",
      "========================",
      "🚀 Passionate about creating innovative solutions",
      "💻 Full-stack developer with modern tech stack",
      "🎯 Problem solver and fast learner",
      "🌟 Always exploring new technologies",
      ""
    ],
    skills: () => [
      "Technical Skills:",
      "================",
      "Frontend: React, Next.js, TypeScript, TailwindCSS",
      "Backend: Node.js, Express, Python, Rust, C++",
      "Database: MongoDB, PostgreSQL, Redis",
      "DevOps: Docker, AWS, Git, CI/CD",
      "Other: WebSocket, GraphQL, REST APIs",
      ""
    ],
    projects: () => [
      `Total Projects: ${terminalStats.totalProjects}`,
      `Public Repositories: ${terminalStats.publicRepos}`,
      `Total Stars: ${terminalStats.totalStars}`,
      `Total Forks: ${terminalStats.totalForks}`,
      ""
    ],
    contact: () => [
      "Contact Information:",
      "==================",
      "📧 Email: sw3d0o@gmail.com",
      "🐙 GitHub: https://github.com/sw3do",
      "🐦 Twitter: https://x.com/sw3doo",
      "📸 Instagram: https://instagram.com/sw3doo",
      ""
    ],
    clear: () => {
      setTerminalHistory([
        t('terminal.welcome'),
        t('terminal.subtitle'),
        ""
      ]);
      setIsTerminalScrolledToBottom(true);
      return [];
    },
    whoami: () => ["sw3do", ""],
    date: () => [new Date().toLocaleString(), ""],
    ls: () => [
      "Available sections:",
      "home/", "about/", "projects/", "skills/", "contact/",
      "terminal/", "github-stats/",
      ""
    ],
    "cat readme.md": () => [
      "# sw3do Portfolio",
      "",
      "Welcome to my interactive portfolio! 🎉",
      "",
      "## Features",
      "- 🌟 Interactive terminal",
      "- 📊 Live GitHub statistics",
      "- 🎨 Beautiful animations",
      "- 🌙 Dark/Light mode",
      "",
      "## Technologies",
      "Built with React, Next.js, TypeScript, and love ❤️",
      ""
    ]
  }), [terminalStats, t]);

  const handleTerminalCommand = useCallback((command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    const commandFunction = terminalCommands[trimmedCommand as keyof typeof terminalCommands];
    
    setTerminalHistory(prev => {
      let newHistory: string[] = [];
      
      if (commandFunction) {
        const output = commandFunction();
        newHistory = [...prev, `$ ${command}`, ...output];
      } else if (trimmedCommand === "") {
        newHistory = [...prev, "$"];
      } else {
        newHistory = [
          ...prev,
          `$ ${command}`,
          t('terminal.commandNotFound', { command }),
          t('terminal.typeHelp'),
          ""
        ];
      }
      
      return newHistory.slice(-50);
    });
    
    setTerminalInput("");
  }, [terminalCommands, t]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleClearTerminal = useCallback(() => {
    setTerminalHistory([
      t('terminal.welcome'),
      t('terminal.subtitle'),
      ""
    ]);
    setIsTerminalScrolledToBottom(true);
  }, [t]);

  const handleTerminalInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setTerminalInput(value);
    }
  }, []);

  const handleTerminalKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      e.preventDefault();
      handleTerminalCommand(terminalInput);
    } else if (e.key === 'Enter' && !terminalInput.trim()) {
      e.preventDefault();
      setTerminalHistory(prev => [...prev.slice(-49), "$"]);
      setTerminalInput("");
    }
  }, [terminalInput, handleTerminalCommand]);

  const handleTerminalScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 3;
    setIsTerminalScrolledToBottom(isAtBottom);
  }, []);



  useEffect(() => {
    let abortController: AbortController | null = null;

    const fetchGitHubStats = async () => {
      if (!user?.login) return;
      
      abortController = new AbortController();
      
      try {
        const response = await fetch(
          `https://api.github.com/users/${user.login}/events/public`,
          { signal: abortController.signal }
        );
        
        if (!response.ok) throw new Error('Failed to fetch GitHub stats');
        
        const events = await response.json();
        
        const recentActivity = events.slice(0, 10).map((event: { type: string; repo: { name: string }; created_at: string; payload: { commits?: { message: string }[]; ref_type?: string; ref?: string } }) => ({
          type: event.type,
          repo: event.repo.name,
          created_at: event.created_at,
          payload: event.payload
        }));

        const contributionData = generateContributionData(events);
        
        setGitHubStats({
          recentActivity,
          totalEvents: events.length,
          contributionData,
          totalContributions: contributionData.totalContributions,
          totalRepositories: user?.public_repos || 0,
          totalStars: repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0),
          totalForks: repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0)
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching GitHub stats:', error);
        }
      }
    };

    if (isClient && user?.login) {
      const timeoutId = setTimeout(fetchGitHubStats, 300);
      return () => {
        clearTimeout(timeoutId);
        if (abortController) {
          abortController.abort();
        }
      };
    }

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [user?.login, user?.public_repos, isClient, generateContributionData, repos]);

  const topLanguages = useMemo(() => 
    Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
  , [languages]);

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
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode
            ? "bg-slate-900/80 border-slate-700/50"
            : "bg-white/80 border-gray-300/50"
          }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className={`text-2xl font-bold cursor-pointer transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToHome()}
          >
            sw3do
          </motion.div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              {[
                { id: 'home', label: t('nav.home') },
                { id: 'about', label: t('nav.about') },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: t('nav.projects') },
                { id: 'terminal', label: 'Terminal' },
                { id: 'stats', label: 'Stats' },
                { id: 'contact', label: t('nav.contact') }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => item.id === 'home' ? scrollToHome() : scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                      layoutId="activeSection"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${isDarkMode
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

      {/* Floating Particles Background - Optimized */}
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


              {/* Floating Particles - Optimized */}
              {isClient && [...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50 pointer-events-none"
                  style={{
                    top: `${25 + Math.sin(i * 90) * 50}%`,
                    left: `${25 + Math.cos(i * 90) * 50}%`,
                    willChange: 'transform, opacity'
                  }}
                  animate={{
                    y: [-8, -16, -8],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.3,
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
              className={`text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
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
              style={{ 
                backgroundSize: "200% auto",
                willChange: 'background-position'
              }}
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
            className={`text-xl mb-4 max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"
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
            <div className={`text-2xl font-mono min-h-[2rem] flex items-center justify-center transition-colors duration-300 ${isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}>
              <span className="mr-1">&gt;</span>
              <span>{typeText}</span>
              <motion.span
                className={`inline-block w-0.5 h-6 ml-1 transition-colors duration-300 ${isDarkMode ? "bg-blue-400" : "bg-blue-600"
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
              className={`text-center rounded-xl p-6 border transition-all duration-300 ${isDarkMode
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
              className={`text-center rounded-xl p-6 border transition-all duration-300 ${isDarkMode
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
              className={`text-center rounded-xl p-6 border transition-all duration-300 ${isDarkMode
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
              className={`text-center rounded-xl p-6 border transition-all duration-300 ${isDarkMode
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
              <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
                  ? "from-blue-400 via-cyan-400 to-blue-500"
                  : "from-blue-600 via-cyan-600 to-blue-700"
                }`}>
                {t('experience.title')}
              </h2>

              {/* Simple decorative lines */}
              <div className="absolute -left-6 top-1/2 w-4 h-0.5 bg-blue-400 opacity-60" />
              <div className="absolute -right-6 top-1/2 w-4 h-0.5 bg-cyan-400 opacity-60" />
            </div>

            <p className={`max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
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
                  className={`relative mb-12 last:mb-0 ${isEven ? "md:pr-1/2" : "md:pl-1/2 md:text-right"
                    }`}
                >
                  {/* Simple Timeline Node */}
                  <div className={`absolute ${isEven
                      ? "left-8 md:right-0 md:left-auto md:transform md:translate-x-1/2"
                      : "left-8 md:left-0 md:transform md:-translate-x-1/2"
                    } top-6 md:top-8 z-20`}>

                    {/* Simple node */}
                    <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex flex-col items-center justify-center shadow-md border-2 border-white/20 transition-transform duration-200 hover:scale-105">
                      <span className="text-white font-bold text-xs leading-none">{exp.year}</span>
                      <div className="w-1 h-1 bg-white rounded-full mt-1 opacity-80"></div>
                    </div>

                    {/* Simple connecting line */}
                    <div className={`absolute top-6 ${isEven
                        ? "left-12 w-6 md:w-8"
                        : "left-12 w-6 md:w-8"
                      } h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-40`} />
                  </div>

                  {/* Experience Card */}
                  <div className={`ml-20 md:ml-0 ${!isEven ? "md:mr-20" : ""}`}>
                    <div className={`relative rounded-xl p-6 border backdrop-blur-sm transition-all duration-200 hover:border-blue-500/50 ${isDarkMode
                        ? "bg-slate-800/60 border-slate-700/50"
                        : "bg-white/80 border-gray-300/50"
                      }`}>

                      {/* Content */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                            {t(exp.titleKey)}
                          </h3>
                          <p className="text-blue-500 font-semibold text-sm mb-1">
                            {t(exp.companyKey)}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <div className={`w-2 h-2 rounded-full mr-2 ${index === 0 ? "bg-green-400" : "bg-gray-400"
                              }`}></div>
                            {index === 0 ? "Current" : "Completed"}
                          </div>
                        </div>
                      </div>

                      <p className={`mb-4 text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                        {t(exp.descriptionKey)}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${isDarkMode
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
                    <div className={`absolute ${isEven ? "top-4 right-4" : "top-4 left-4"
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
          id="skills"
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
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 pl-10 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none transition-colors"
                />
                <FaCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
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
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-2 ${showFeaturedOnly
                      ? "bg-yellow-500 text-black shadow-lg"
                      : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                    }`}
                >
                  <span className="text-xs">{t('projects.featuredOnly')}</span>
                </button>
              </div>

              {/* Language Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedFilter === "all"
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
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-2 ${selectedFilter === language
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
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                        {repo.name}
                      </h3>
                      <p className={`text-sm mb-3 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                        {repo.description || t('projects.noDescription')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode
                          ? "bg-blue-900/40 text-blue-300 border border-blue-700/50"
                          : "bg-blue-100/80 text-blue-700 border border-blue-300/50"
                        }`}>
                        {repo.language}
                      </span>
                    </div>
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



        {/* Interactive Terminal */}
        <motion.div
          id="terminal"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="mb-16 py-12"
        >
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
                  ? "from-green-400 via-blue-400 to-purple-400"
                  : "from-green-600 via-blue-600 to-purple-600"
                }`}>
                {t('terminal.title')}
              </h2>
              <div className="absolute -left-6 top-1/2 w-4 h-0.5 bg-green-400 opacity-60" />
              <div className="absolute -right-6 top-1/2 w-4 h-0.5 bg-blue-400 opacity-60" />
            </div>
            <p className={`max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
              {t('terminal.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
              className={`rounded-xl border transition-all duration-300 ${isDarkMode
                  ? "bg-gray-900/90 border-gray-800"
                  : "bg-gray-800/90 border-gray-700"
                } backdrop-blur-sm shadow-2xl`}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700/50">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-300">
                    <FaTerminal className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-mono hidden sm:inline">sw3do@portfolio:~$</span>
                    <span className="text-xs font-mono sm:hidden">terminal</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={handleClearTerminal}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded text-xs transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('terminal.clear')}
                  </motion.button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-3 sm:p-6">
                <div 
                  className="h-60 sm:h-80 overflow-y-auto font-mono text-xs sm:text-sm terminal-history"
                  style={{ scrollBehavior: 'smooth' }}
                  onScroll={handleTerminalScroll}
                >
                  {terminalHistory.slice(-30).map((line, index) => (
                    <div
                      key={`${terminalHistory.length - 30 + index}`}
                      className={`mb-1 break-words ${line.startsWith('$') 
                          ? 'text-green-400 font-semibold' 
                          : 'text-gray-300'
                        }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Terminal Input */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="text-green-400 font-mono">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={handleTerminalInputChange}
                      onKeyPress={handleTerminalKeyPress}
                      placeholder={t('terminal.placeholder')}
                      className="flex-1 bg-transparent text-gray-300 font-mono focus:outline-none placeholder-gray-500 text-xs sm:text-sm min-w-0"
                      autoFocus
                    />
                  </div>
                  <motion.button
                    onClick={() => handleTerminalCommand(terminalInput)}
                    className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded text-xs transition-colors flex items-center justify-center space-x-1 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlay className="w-3 h-3" />
                    <span>{t('terminal.run')}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Discord Status Section */}
        {discordData && (
          <motion.div
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

        {/* Live GitHub Stats */}
        <motion.div
          id="stats"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
                  ? "from-orange-400 via-red-400 to-pink-400"
                  : "from-orange-600 via-red-600 to-pink-600"
                }`}>
                {t('githubStats.title')}
              </h2>
              <div className="absolute -left-6 top-1/2 w-4 h-0.5 bg-orange-400 opacity-60" />
              <div className="absolute -right-6 top-1/2 w-4 h-0.5 bg-red-400 opacity-60" />
            </div>
            <p className={`max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
              {t('githubStats.subtitle')}
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* GitHub Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.4 }}
                className={`text-center rounded-xl p-4 sm:p-6 border transition-all duration-300 ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700/50 hover:border-orange-500/50"
                    : "bg-white/80 border-gray-300/50 hover:border-orange-500/50"
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <FaChartLine className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-2">
                  {repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0)}
                </div>
                <div className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {t('githubStats.totalStars')}
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.5 }}
                className={`text-center rounded-xl p-4 sm:p-6 border transition-all duration-300 ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700/50 hover:border-red-500/50"
                    : "bg-white/80 border-gray-300/50 hover:border-red-500/50"
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <FaCodeBranch className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-2">
                  {repos.reduce((sum: number, repo: GitHubRepo) => sum + repo.forks_count, 0)}
                </div>
                <div className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {t('githubStats.totalForks')}
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.6 }}
                className={`text-center rounded-xl p-4 sm:p-6 border transition-all duration-300 ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700/50 hover:border-pink-500/50"
                    : "bg-white/80 border-gray-300/50 hover:border-pink-500/50"
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <FaFolder className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-2">
                  {user?.public_repos || 0}
                </div>
                <div className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {t('githubStats.publicRepos')}
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.7 }}
                className={`text-center rounded-xl p-4 sm:p-6 border transition-all duration-300 ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700/50 hover:border-purple-500/50"
                    : "bg-white/80 border-gray-300/50 hover:border-purple-500/50"
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <FaUsers className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">
                  {user?.followers || 0}
                </div>
                <div className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {t('githubStats.followers')}
                </div>
              </motion.div>
            </div>

            {/* GitHub Contribution Graph */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3.8 }}
              className={`rounded-xl border transition-all duration-300 mb-8 ${isDarkMode
                  ? "bg-slate-800/60 border-slate-700/50"
                  : "bg-white/80 border-gray-300/50"
                } backdrop-blur-sm`}
            >
              <div className="p-4 sm:p-6">
                <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center space-x-2 ${isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                  <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span>{t('githubStats.contribution.title')}</span>
                </h3>
                
                <div className="space-y-4">
                  {/* Stats Summary */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-6">
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {t('githubStats.contribution.subtitle')}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Less</span>
                      <div className="flex space-x-1">
                        <div className={`w-2.5 h-2.5 rounded-sm ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`}></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-green-200"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-green-400"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-green-600"></div>
                        <div className="w-2.5 h-2.5 rounded-sm bg-green-800"></div>
                      </div>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>More</span>
                    </div>
                  </div>

                  {/* GitHub Native Contribution Graph */}
                  <div className="overflow-x-auto">
                    <div className="min-w-full">
                      <div className="flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://ghchart.rshah.org/${user?.login}`}
                          alt="GitHub Contribution Graph"
                          className={`max-w-full h-auto rounded-lg ${isDarkMode ? 'invert' : ''}`}
                          style={{ filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none' }}
                        />
                      </div>
                      
                      
                                             {/* Backup: Link to GitHub Profile */}
                       <div className="mt-4 text-center">
                         <a
                           href={`https://github.com/${user?.login}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'} transition-colors`}
                         >
                           {t('githubStats.contribution.viewOnGithub')}
                         </a>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4.0 }}
              className={`rounded-xl border transition-all duration-300 ${isDarkMode
                  ? "bg-slate-800/60 border-slate-700/50"
                  : "bg-white/80 border-gray-300/50"
                } backdrop-blur-sm`}
            >
              <div className="p-4 sm:p-6">
                <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center space-x-2 ${isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                  <FaFire className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  <span>{t('githubStats.recentActivity')}</span>
                </h3>

                {gitHubStats?.recentActivity ? (
                  <div className="space-y-3 sm:space-y-4">
                    {gitHubStats.recentActivity.slice(0, 8).map((activity: { type: string; repo: string; created_at: string; payload: { commits?: { message: string }[]; ref_type?: string; ref?: string } }, index: number) => {
                      const getActivityIcon = (type: string) => {
                        switch (type) {
                          case 'PushEvent': return <FaCodeBranch className="w-4 h-4 text-green-400" />;
                          case 'CreateEvent': return <FaFolder className="w-4 h-4 text-blue-400" />;
                          case 'WatchEvent': return <FaStar className="w-4 h-4 text-yellow-400" />;
                          case 'ForkEvent': return <FaCodeBranch className="w-4 h-4 text-purple-400" />;
                          default: return <FaCode className="w-4 h-4 text-gray-400" />;
                        }
                      };

                      const getActivityText = (type: string, payload: { commits?: { message: string }[]; ref_type?: string; ref?: string }) => {
                        switch (type) {
                          case 'PushEvent': return `Pushed ${payload.commits?.length || 0} commits`;
                          case 'CreateEvent': return `Created ${payload.ref_type} ${payload.ref || ''}`;
                          case 'WatchEvent': return 'Starred repository';
                          case 'ForkEvent': return 'Forked repository';
                          default: return type.replace('Event', '');
                        }
                      };

                      return (
                        <motion.div
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 4 + index * 0.1 }}
                          className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg transition-all duration-200 ${isDarkMode
                              ? "bg-slate-700/30 hover:bg-slate-700/50"
                              : "bg-gray-100/50 hover:bg-gray-200/50"
                            }`}
                        >
                          <div className="flex-shrink-0">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"
                              }`}>
                              {getActivityText(activity.type, activity.payload)}
                            </p>
                            <p className={`text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}>
                              {activity.repo.split('/')[1]}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <span className="text-xs text-gray-500 hidden sm:inline">
                              {new Date(activity.created_at).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-gray-500 sm:hidden">
                              {new Date(activity.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <div className="text-3xl sm:text-4xl mb-4">⏳</div>
                    <p className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {t('githubStats.loading')}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          id="contact"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 4.2 }}
          className="mt-16 mb-16"
        >
          <div className="text-center mb-12">
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
      <footer className={`border-t mt-20 transition-colors duration-300 ${isDarkMode
          ? "bg-slate-900/80 border-slate-700/50"
          : "bg-gray-100/80 border-gray-300/50"
        }`}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
                }`}>sw3do</h3>
              <p className={`mb-4 max-w-md transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h4 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
                }`}>{t('footer.technologies')}</h4>
              <ul className="space-y-2">
                <li><span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>React & Next.js</span></li>
                <li><span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>Node.js & Express</span></li>
                <li><span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>TypeScript</span></li>
                <li><span className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>MongoDB & PostgreSQL</span></li>
              </ul>
            </div>
          </div>

          <div className={`border-t mt-8 pt-8 text-center transition-colors duration-300 ${isDarkMode ? "border-slate-700/50" : "border-gray-300/50"
            }`}>
            <p className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
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

export default React.memo(Home);