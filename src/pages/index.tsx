import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubRepo, GitHubUser } from "../types/github";
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
  SiGo
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
    'MongoDB': <SiMongodb className="w-5 h-5 text-green-400" />,
    'PostgreSQL': <SiPostgresql className="w-5 h-5 text-blue-400" />,
    'Docker': <SiDocker className="w-5 h-5 text-blue-400" />,
    'Kubernetes': <SiKubernetes className="w-5 h-5 text-blue-400" />,
    'GraphQL': <SiGraphql className="w-5 h-5 text-pink-400" />,
    'Redis': <SiRedis className="w-5 h-5 text-red-400" />,
    'TailwindCSS': <SiTailwindcss className="w-5 h-5 text-teal-400" />,
  };

  return iconMap[language] || <FaCode className="w-5 h-5 text-gray-400" />;
};

export default function Home() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [typeText, setTypeText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const achievements = [
    { icon: <FaTrophy className="w-6 h-6 text-yellow-400" />, title: "Problem Solver", desc: "500+ LeetCode Problems" },
    { icon: <FaRocket className="w-6 h-6 text-blue-400" />, title: "Fast Learner", desc: "20+ Technologies Mastered" },
    { icon: <FaUsers className="w-6 h-6 text-green-400" />, title: "Team Player", desc: "10+ Collaborative Projects" },
    { icon: <FaCode className="w-6 h-6 text-purple-400" />, title: "Clean Code", desc: "Maintainable & Scalable" }
  ];

      const experiences = [
    {
      year: "2025",
      title: "AnimeEly Platform",
      company: "Full Stack Web Development",
      description: "Modern anime streaming platform. User-friendly interface and high-performance focused development.",
      technologies: ["Next.js", "TailwindCSS", "Express", "MongoDB"]
    },
    {
      year: "2025",
      title: "Fast-DB & Quick.Prisma",
      company: "Database Solutions",
      description: "High-performance database module (C++) and TypeScript ORM solution development.",
      technologies: ["C++", "Node.js", "TypeScript", "Prisma"]
    },
    {
      year: "2025",
      title: "Discord Bot Ecosystem",
      company: "Discord Development",
      description: "Backup system and command synchronization tools for Discord servers.",
      technologies: ["TypeScript", "JavaScript", "Discord.js"]
    },
    {
      year: "2025",
      title: "Mobile & Desktop Apps",
      company: "Cross-Platform Development",
      description: "Earthquake tracking app (React Native) and Valorant friend manager (PyQt5).",
      technologies: ["React Native", "Expo", "Python", "PyQt5"]
    },
    {
      year: "2025",
      title: "Rust Development",
      company: "System Programming",
      description: "Developing wrapper library in Rust language for MyAnimeList API.",
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
    const titles = [
      "Full Stack Developer 💻",
      "Code Enthusiast 🚀",
      "Problem Solver 🧩",
      "Tech Explorer 🔍",
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
  }, [textIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filterRepos = () => {
      if (selectedFilter === "all") {
        setFilteredRepos(repos);
      } else {
        const filtered = repos.filter(repo =>
          repo.language?.toLowerCase() === selectedFilter.toLowerCase()
        );
        setFilteredRepos(filtered);
      }
    };

    filterRepos();
  }, [repos, selectedFilter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);

        const [userResponse, reposResponse] = await Promise.all([
          fetch("https://api.github.com/users/sw3do"),
          fetch("https://api.github.com/users/sw3do/repos?sort=updated&per_page=100")
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        const filteredRepos = reposData.filter((repo: GitHubRepo) => !repo.fork);

        // Calculate language stats
        const langStats: { [key: string]: number } = {};
        let stars = 0;
        let forks = 0;

        filteredRepos.forEach((repo: GitHubRepo) => {
          if (repo.language) {
            langStats[repo.language] = (langStats[repo.language] || 0) + 1;
          }
          stars += repo.stargazers_count;
          forks += repo.forks_count;
        });

        setUser(userData);
        setRepos(filteredRepos);
        setFilteredRepos(filteredRepos);
        setLanguages(langStats);
        setTotalStars(stars);
        setTotalForks(forks);
      } catch (err) {
        setError("Error loading GitHub data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
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
            className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-sm"
          >
            Loading GitHub data...
          </motion.p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-white text-2xl font-bold bg-red-800/30 p-8 rounded-lg backdrop-blur-sm border border-red-700/50"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
          >
            sw3do
          </motion.div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Social Media</a>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Floating Particles Background */}
      <div className="fixed inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
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
              {[...Array(6)].map((_, i) => (
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
              className="text-6xl font-bold text-white bg-gradient-to-r from-blue-400 via-white to-cyan-400 bg-clip-text text-transparent"
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
            className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {user?.bio || "Hi."}
          </motion.p>

          {/* Typing Effect */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-2xl font-mono text-blue-400 min-h-[2rem] flex items-center justify-center">
              <span className="mr-1">&gt;</span>
              <span>{typeText}</span>
              <motion.span
                className="inline-block w-0.5 h-6 bg-blue-400 ml-1"
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
                  Website
                </a>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <FaCalendarAlt className="w-4 h-4" />
              <span>On GitHub since {new Date(user?.created_at || '').getFullYear()}</span>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="text-center bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
            >
              <div className="flex items-center justify-center mb-2">
                <FaFolder className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">{user?.public_repos}</div>
              <div className="text-xs text-gray-400 font-medium">Repositories</div>
            </motion.div>

            <motion.div
              className="text-center bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(34, 197, 94, 0.3)" }}
            >
              <div className="flex items-center justify-center mb-2">
                <FaStar className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-1">{totalStars}</div>
              <div className="text-xs text-gray-400 font-medium">Total Stars</div>
            </motion.div>

            <motion.div
              className="text-center bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
            >
              <div className="flex items-center justify-center mb-2">
                <FaUsers className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-1">{user?.followers}</div>
              <div className="text-xs text-gray-400 font-medium">Followers</div>
            </motion.div>

            <motion.div
              className="text-center bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.3)" }}
            >
              <div className="flex items-center justify-center mb-2">
                <FaCodeBranch className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-orange-400 mb-1">{totalForks}</div>
              <div className="text-xs text-gray-400 font-medium">Total Forks</div>
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
              🏆 Achievements
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Accomplishments in my software development journey
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
                  {achievement.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {achievement.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              💼 Experience
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My professional development journey
            </p>
          </div>

                    <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent opacity-30" />
            
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.2 }}
                className="relative mb-8 last:mb-0"
              >
                <div className="flex items-start md:items-center">
                  <div className="flex-shrink-0 relative z-10">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-white font-bold text-sm">{exp.year}</span>
                    </motion.div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-20 animate-pulse" />
                  </div>
                  
                  <div className="ml-4 md:ml-6 flex-1">
                    <motion.div 
                      className="bg-slate-800/60 rounded-xl p-4 md:p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)" 
                      }}
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 font-medium mb-3 text-sm md:text-base">
                        {exp.company}
                      </p>
                      <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-blue-900/40 rounded-full text-xs text-blue-300 border border-blue-700/50 hover:bg-blue-800/40 transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              💻 Tech Stack
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Most used programming languages and technologies
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
                        <span>{count} projects</span>
                        <span>{totalProjects} total</span>
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
                🚀 Other Technologies
              </h3>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API', 'Microservices', 'CI/CD'].map((tech, index) => (
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
              🚀 Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              My most popular and recent projects on GitHub
            </p>

            {/* Project Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedFilter === "all"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                  }`}
              >
                All ({repos.length})
              </button>
              {topLanguages.slice(0, 5).map(([language, count]) => (
                <button
                  key={language}
                  onClick={() => setSelectedFilter(language)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedFilter === language
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                    }`}
                >
                  {language} ({count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredRepos.slice(0, 9).map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.9 + index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.h3
                  className="text-xl font-semibold text-white truncate flex-1 mr-2"
                  whileHover={{ color: "#3b82f6" }}
                >
                  {repo.name}
                </motion.h3>
                <div className="flex space-x-3">
                  <span className="text-yellow-500 text-sm">⭐ {repo.stargazers_count}</span>
                  <span className="text-blue-400 text-sm">🍴 {repo.forks_count}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {repo.description || "No description available"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {repo.language && (
                    <span className="px-3 py-1 bg-blue-900/40 rounded-full text-xs text-blue-300 border border-blue-700/50">
                      {repo.language}
                    </span>
                  )}
                </div>

                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
              🌐 Social Media
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              You can follow my social media accounts to connect with me.
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
                      {link.label === "GitHub" && "Check my projects"}
                      {link.label === "LinkedIn" && "Professional network"}
                      {link.label === "X" && "Latest updates"}
                      {link.label === "Email" && "Direct contact"}
                      {link.label === "Instagram" && "Visual stories"}
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
            My GitHub Profile
          </motion.a>

        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-700/50 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-4">sw3do</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                As a Full Stack Developer, I build user-friendly and performant
                applications with modern web technologies.
              </p>
            </div>

        

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">React & Next.js</span></li>
                <li><span className="text-gray-400">Node.js & Express</span></li>
                <li><span className="text-gray-400">TypeScript</span></li>
                <li><span className="text-gray-400">MongoDB & PostgreSQL</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 sw3do. All rights reserved. Made with{' '}
              <span className="text-red-400">❤️</span> and{' '}
              <span className="text-yellow-400">☕</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
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