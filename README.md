# 🚀 sw3do.is-a.dev - Personal Portfolio Website

Modern, responsive and interactive personal portfolio website. Dynamic project showcase with GitHub API integration and impressive animations.

## ✨ Features

- 🎨 **Modern Design** - Glassmorphism and gradient effects
- 📱 **Fully Responsive** - Perfect appearance on all devices
- 🔄 **Dynamic Content** - GitHub API integration
- ⚡ **High Performance** - Next.js and optimizations
- 🎭 **Smooth Animations** - Fluid transitions with Framer Motion
- 🌙 **Dark Theme** - Eye-friendly dark theme
- 🎯 **Project Filtering** - Filter by programming language
- 📊 **Real-time Stats** - GitHub statistics
- 🎪 **Interactive Elements** - Hover effects and micro-interactions

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Next.js 14
- **Styling:** TailwindCSS, CSS Modules
- **Animations:** Framer Motion
- **Icons:** React Icons
- **API:** GitHub REST API
- **Deployment:** Vercel/Netlify

## 🏗️ Installation

### Requirements
- Node.js 18+
- npm or yarn
- Git

### Steps

1. **Clone the project**
```bash
git clone https://github.com/sw3do/sw3do.is-a.dev.git
cd sw3do.is-a.dev
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Next.js pages
│   └── index.tsx       # Main page
├── types/              # TypeScript type definitions
│   └── github.ts       # GitHub API types
├── styles/             # Global styles
└── public/             # Static files
```

## 🎨 Components

### Main Sections
- **Hero Section** - Profile photo, name and typing animation
- **About Section** - Personal achievements and experiences
- **Experience Timeline** - Chronological experience list
- **Skills Section** - Tech stack and competencies
- **Projects Section** - Dynamic list of GitHub projects
- **Social Media** - Contact links
- **Footer** - Site information

### Special Features
- **Floating Particles** - Background animations
- **Scroll to Top** - Back to top button
- **Navbar** - Fixed navigation menu
- **Project Filtering** - Language-based filtering system

## 🔧 Configuration

### GitHub API
The site automatically fetches repositories from your GitHub profile. For a different user:

```typescript
// src/pages/index.tsx
const [userResponse, reposResponse] = await Promise.all([
  fetch("https://api.github.com/users/YOUR_USERNAME"),
  fetch("https://api.github.com/users/YOUR_USERNAME/repos?sort=updated&per_page=100")
]);
```

### Personal Information
To update experiences and social media links:

```typescript
// src/pages/index.tsx
const experiences = [
  // Add your own experiences
];

const socialLinks = [
  // Update your social media links
];
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Automatic deployment will start
3. You can add a custom domain

### Netlify
1. Build command: `npm run build`
2. Output directory: `out`
3. Deploy with drag & drop

### GitHub Pages
```bash
npm run build
npm run export
# Upload the out folder to GitHub Pages
```

## 🎯 Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <2.5s
- **Cumulative Layout Shift:** <0.1

## 🔄 Updates

### v2.0.0 (2025)
- ✅ GitHub API integration
- ✅ Framer Motion animations
- ✅ Responsive design
- ✅ Project filtering system
- ✅ Experience timeline

### v1.0.0 (2024)
- ✅ First release
- ✅ Basic portfolio structure

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **GitHub:** [@sw3do](https://github.com/sw3do)
- **Email:** sw3d0o@gmail.com
- **Website:** [sw3do.is-a.dev](https://sw3do.is-a.dev)
- **X (Twitter):** [@sw3doo](https://x.com/sw3doo)
- **Instagram:** [@sw3doo](https://instagram.com/sw3doo)

## 🙏 Acknowledgments

- [React Icons](https://react-icons.github.io/react-icons/) - For icons
- [Framer Motion](https://www.framer.com/motion/) - For animations
- [TailwindCSS](https://tailwindcss.com/) - For styling
- [GitHub API](https://docs.github.com/en/rest) - For dynamic data

---

⭐ **Don't forget to star this project if you liked it!**

<div align="center">
  <img src="https://img.shields.io/github/stars/sw3do/sw3do.is-a.dev?style=social" alt="GitHub stars">
  <img src="https://img.shields.io/github/forks/sw3do/sw3do.is-a.dev?style=social" alt="GitHub forks">
  <img src="https://img.shields.io/github/watchers/sw3do/sw3do.is-a.dev?style=social" alt="GitHub watchers">
</div>
