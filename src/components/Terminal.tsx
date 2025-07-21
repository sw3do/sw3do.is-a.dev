import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { FaPlay, FaTerminal } from 'react-icons/fa';

interface TerminalProps {
  isDarkMode: boolean;
  repos: { stargazers_count: number; forks_count: number }[];
  user: { public_repos?: number } | null;
}

const TerminalComponent: React.FC<TerminalProps> = ({ isDarkMode, repos, user }) => {
  const { t } = useTranslation();
  
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [isTerminalScrolledToBottom, setIsTerminalScrolledToBottom] = useState(true);

  useEffect(() => {
    setTerminalHistory([
      t('terminal.welcome'),
      t('terminal.subtitle'),
      ""
    ]);
  }, [t]);

  useEffect(() => {
    if (isTerminalScrolledToBottom) {
      const terminalElement = document.querySelector('.terminal-history');
      if (terminalElement) {
        terminalElement.scrollTop = terminalElement.scrollHeight;
      }
    }
  }, [terminalHistory, isTerminalScrolledToBottom]);

  const terminalStats = useMemo(() => ({
    totalProjects: repos.length,
    publicRepos: user?.public_repos || 0,
    totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  }), [repos, user]);

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
  }), [t, terminalStats, setTerminalHistory, setIsTerminalScrolledToBottom]);

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

      return newHistory.slice(-30);
    });

    setTerminalInput("");
  }, [terminalCommands, t]);

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

  return (
    <motion.div
      id="terminal"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
            ? "from-green-400 via-blue-400 to-cyan-400"
            : "from-green-600 via-blue-600 to-cyan-600"
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

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className={`rounded-xl border backdrop-blur-sm transition-all duration-300 ${isDarkMode
            ? "bg-slate-900/90 border-slate-700/50"
            : "bg-gray-900/95 border-gray-700/50"
            }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <FaTerminal className="w-4 h-4" />
                <span className="text-sm font-mono">terminal@sw3do:~$</span>
              </div>
            </div>
            <motion.button
              onClick={handleClearTerminal}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('terminal.clear')}
            </motion.button>
          </div>

          <div className="p-4">
            <div
              className="terminal-history h-64 overflow-y-auto font-mono text-sm bg-transparent scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
              onScroll={handleTerminalScroll}
            >
              {terminalHistory.slice(-20).map((line, index) => (
                <div
                  key={`${terminalHistory.length - 20 + index}`}
                  className={`mb-1 break-words ${line.startsWith('$')
                    ? 'text-green-400 font-semibold'
                    : 'text-gray-300'
                    }`}
                >
                  {line}
                </div>
              ))}
            </div>

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
  );
};

export const Terminal = React.memo(TerminalComponent);