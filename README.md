# 🚀 sw3do.is-a.dev - Personal Portfolio Website

Modern, responsive and interactive personal portfolio website with real-time Discord status, interactive terminal, and multi-language support. Dynamic project showcase with GitHub API integration and stunning animations.

## ✨ Features

- 🎨 **Modern Design** - Glassmorphism, gradients and authentic Discord UI
- 📱 **Fully Responsive** - Perfect appearance on all devices
- 🔄 **Dynamic Content** - GitHub API integration with real-time data
- ⚡ **High Performance** - Next.js 14, optimized terminal, and efficient rendering
- 🎭 **Smooth Animations** - Fluid transitions with Framer Motion
- 🌙 **Dark/Light Theme** - Toggle between themes with smooth transitions
- 🎯 **Advanced Filtering** - Filter projects by language, stars, and search
- 📊 **Real-time Stats** - Live GitHub statistics and contribution graphs
- 🎪 **Interactive Elements** - Hover effects and micro-interactions
- 🎮 **Discord Integration** - Real-time Discord status via Lanyard API
- 💻 **Interactive Terminal** - Fully functional command-line interface
- 🌍 **Multi-language Support** - Turkish, English, and German support
- 🎵 **Spotify Integration** - Live music listening status
- 📈 **GitHub Analytics** - Contribution graphs and activity tracking

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18, TypeScript, Next.js 14
- **Styling:** TailwindCSS, CSS Modules
- **Animations:** Framer Motion
- **Icons:** React Icons, Simple Icons
- **State Management:** React Hooks

### Integrations
- **GitHub API** - Repository data and user statistics
- **Lanyard API** - Real-time Discord presence
- **WebSocket** - Live Discord status updates
- **Spotify API** - Music listening integration

### Internationalization
- **i18next** - Multi-language support
- **react-i18next** - React integration
- **Language Detection** - Automatic browser language detection

### Performance
- **React.memo** - Component memoization
- **useCallback/useMemo** - Hook optimizations
- **Lazy Loading** - Dynamic imports
- **Image Optimization** - Next.js image optimization

## 🏗️ Installation

### Requirements
- Node.js 18+
- npm or yarn or bun
- Git

### Steps

1. **Clone the project**
```bash
git clone https://github.com/sw3do/sw3do.is-a.dev.git
cd sw3do.is-a.dev
```

2. **Install dependencies**
```bash
bun install
# or
npm install
# or
yarn install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
# Add your Discord User ID to .env.local
NEXT_PUBLIC_DISCORD_USER_ID=your_discord_user_id
```

4. **Start development server**
```bash
bun dev
# or
npm run dev
# or
yarn dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 📦 Project Structure

```
src/
├── components/          # Reusable components
│   ├── DiscordCard.tsx  # Discord status card
│   └── LanguageSwitcher.tsx # Language toggle
├── hooks/               # Custom hooks
│   ├── useGitHub.ts     # GitHub data fetching
│   └── useLanyard.ts    # Discord status hook
├── lib/                 # Utilities
│   └── i18n.ts          # Internationalization config
├── locales/             # Translation files
│   ├── en.json          # English translations
│   ├── tr.json          # Turkish translations
│   └── de.json          # German translations
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper
│   ├── _document.tsx    # Document structure
│   └── index.tsx        # Main page
├── styles/              # Global styles
│   └── globals.css      # Global CSS and utilities
├── types/               # TypeScript definitions
│   ├── github.ts        # GitHub API types
│   └── lanyard.ts       # Discord/Lanyard types
└── public/              # Static files
```

## 🎨 Components & Features

### Main Sections
- **Hero Section** - Animated profile with GitHub stats
- **About Section** - Personal achievements and experiences
- **Experience Timeline** - Interactive chronological timeline
- **Skills Section** - Tech stack with progress indicators
- **Projects Section** - Dynamic GitHub repository showcase
- **Discord Status** - Real-time Discord presence card
- **Interactive Terminal** - Functional command-line interface
- **GitHub Stats** - Live contribution graphs and analytics
- **Social Media** - Contact links with hover effects
- **Footer** - Site information and technologies

### Advanced Features

#### 🎮 Discord Integration
- **Real-time Status** - Online, idle, DND, offline indicators
- **Spotify Integration** - Live music listening status
- **Activity Tracking** - Current games, apps, and activities
- **Device Indicators** - Desktop, mobile, web presence
- **WebSocket Connection** - Live updates via Lanyard API

#### 💻 Interactive Terminal
- **Command System** - help, about, skills, projects, contact, etc.
- **Performance Optimized** - Efficient rendering and memory management
- **Command History** - Limited to 50 entries for performance
- **Auto-scroll** - Smart scroll positioning
- **Error Handling** - Invalid command feedback

#### 🌍 Multi-language Support
- **3 Languages** - Turkish, English, German
- **Automatic Detection** - Browser language detection
- **Local Storage** - Language preference persistence
- **Dynamic Content** - All text translatable
- **Flag Indicators** - Visual language selection

#### 📈 GitHub Analytics
- **Live Data** - Real-time repository information
- **Contribution Graph** - Native GitHub-style chart
- **Activity Tracking** - Recent GitHub events
- **Statistics** - Stars, forks, repositories count
- **Performance** - Optimized API calls with caching

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_DISCORD_USER_ID=your_discord_user_id_here
```

### Discord Setup
1. Get your Discord User ID
2. Add it to environment variables
3. Discord status will automatically appear

### GitHub API
The site automatically fetches repositories from GitHub. To customize:

```typescript
// src/hooks/useGitHub.ts
const GITHUB_USERNAME = "sw3do"; // Change this
```

### Translations
Add new languages by creating files in `src/locales/`:

```json
// src/locales/es.json (Spanish example)
{
  "nav": {
    "home": "Inicio",
    "about": "Acerca de",
    "projects": "Proyectos",
    "contact": "Contacto"
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Automatic deployment on push

### Netlify
```bash
# Build settings
Build command: npm run build
Output directory: out
Environment variables: Add NEXT_PUBLIC_DISCORD_USER_ID
```

### Docker
```dockerfile
# Dockerfile included for containerized deployment
docker build -t sw3do-portfolio .
docker run -p 3000:3000 sw3do-portfolio
```

## 🎯 Performance Optimizations

### Frontend Performance
- **React.memo** - Component memoization
- **useCallback/useMemo** - Hook optimizations
- **Virtual Scrolling** - Efficient terminal rendering
- **Image Optimization** - Next.js automatic optimization
- **Code Splitting** - Dynamic imports and lazy loading

### Terminal Optimizations
- **History Limit** - Maximum 50 commands stored
- **Render Limit** - Only last 30 lines displayed
- **Memory Management** - Automatic cleanup
- **Smooth Scrolling** - Optimized scroll behavior

### API Optimizations
- **Request Caching** - GitHub API response caching
- **WebSocket** - Efficient Discord status updates
- **Debouncing** - Optimized API calls
- **Error Handling** - Graceful failure handling

## 📊 Lighthouse Scores

- **Performance:** 95+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 95+
- **First Contentful Paint:** <1.2s
- **Largest Contentful Paint:** <2.0s
- **Cumulative Layout Shift:** <0.1

## 🔄 Updates & Changelog

### v3.0.0 (2025) - Current
- ✅ Discord status integration with Lanyard API
- ✅ Interactive terminal with command system
- ✅ Multi-language support (TR, EN, DE)
- ✅ Live GitHub contribution graphs
- ✅ Spotify music integration
- ✅ Dark/Light theme toggle
- ✅ Performance optimizations
- ✅ WebSocket real-time updates
- ✅ Advanced project filtering
- ✅ Terminal performance optimizations

### v2.0.0 (2025)
- ✅ GitHub API integration
- ✅ Framer Motion animations
- ✅ Responsive design improvements
- ✅ Project filtering system
- ✅ Experience timeline

### v1.0.0 (2025)
- ✅ Initial release
- ✅ Basic portfolio structure
- ✅ Static content display

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure performance optimizations

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🛠️ Technologies Used

### Core
- React 18
- Next.js 14
- TypeScript
- TailwindCSS

### Animations & UI
- Framer Motion
- React Icons
- Simple Icons
- CSS3 Animations

### Integrations
- GitHub API
- Lanyard API (Discord)
- Spotify Web API
- WebSocket

### Internationalization
- i18next
- react-i18next
- Language detection

### Performance
- React Query
- SWR
- Memoization
- Virtual scrolling

## 📞 Contact

- **GitHub:** [@sw3do](https://github.com/sw3do)
- **Email:** sw3doo@gmail.com
- **Website:** [sw3do.is-a.dev](https://sw3do.is-a.dev)
- **X (Twitter):** [@sw3doo](https://x.com/sw3doo)
- **Instagram:** [@sw3doo](https://instagram.com/sw3doo)
- **Discord:** Available on website

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Next.js](https://nextjs.org/) - React Framework
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [GitHub API](https://docs.github.com/en/rest) - Repository Data
- [Lanyard API](https://github.com/Phineas/lanyard) - Discord Integration
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library
- [i18next](https://www.i18next.com/) - Internationalization

## 🌟 Features in Detail

### Discord Status Card
Real-time Discord presence with authentic Discord UI design, showing:
- Current status (online, idle, DND, offline)
- Spotify listening activity
- Current games/applications
- Device connections (desktop, mobile, web)

### Interactive Terminal
Fully functional command-line interface with:
- Multiple commands (help, about, skills, projects, contact, etc.)
- Command history and navigation
- Performance optimizations
- Auto-completion suggestions

### Multi-language Experience
Complete internationalization support:
- Automatic language detection
- 3 languages supported (Turkish, English, German)
- Easy to extend with new languages
- Persistent language preferences

---

⭐ **Don't forget to star this project if you liked it!**

<div align="center">
  <img src="https://img.shields.io/github/stars/sw3do/sw3do.is-a.dev?style=for-the-badge&logo=github&color=yellow" alt="GitHub stars">
  <img src="https://img.shields.io/github/forks/sw3do/sw3do.is-a.dev?style=for-the-badge&logo=github&color=blue" alt="GitHub forks">
  <img src="https://img.shields.io/github/watchers/sw3do/sw3do.is-a.dev?style=for-the-badge&logo=github&color=green" alt="GitHub watchers">
  <img src="https://img.shields.io/github/issues/sw3do/sw3do.is-a.dev?style=for-the-badge&logo=github&color=red" alt="GitHub issues">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Discord-Integration-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord Integration">
  <img src="https://img.shields.io/badge/Spotify-Integration-1DB954?style=for-the-badge&logo=spotify&logoColor=white" alt="Spotify Integration">
  <img src="https://img.shields.io/badge/Multi--Language-Support-FF6B6B?style=for-the-badge&logo=google-translate&logoColor=white" alt="Multi-language">
  <img src="https://img.shields.io/badge/Performance-Optimized-4ECDC4?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Performance">
</div>
