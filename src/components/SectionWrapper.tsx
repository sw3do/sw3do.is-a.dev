import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useScroll } from '../hooks/useScroll';
import type { SectionId } from '../types/scroll';

interface SectionWrapperProps {
  id: SectionId;
  className?: string;
  children: React.ReactNode;
  enableAnimation?: boolean;
  animationDelay?: number;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  className = '',
  children,
  enableAnimation = true,
  animationDelay = 0
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection, unregisterSection } = useScroll();

  // Register section when component mounts
  useEffect(() => {
    const element = sectionRef.current;
    if (element) {
      registerSection(id, element);
    }

    // Cleanup on unmount
    return () => {
      unregisterSection(id);
    };
  }, [id, registerSection, unregisterSection]);

  const defaultAnimationProps = useMemo(() => enableAnimation ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.4, 
      delay: animationDelay,
      ease: [0.4, 0, 0.2, 1] as const
    },
    viewport: { once: true, margin: "-30px" }
  } : {}, [enableAnimation, animationDelay]);

  if (!enableAnimation) {
    return (
      <section
        ref={sectionRef}
        id={id}
        className={`scroll-mt-20 motion-safe ${className}`}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`scroll-mt-20 motion-element ${className}`}
      {...defaultAnimationProps}
    >
      {children}
    </motion.section>
  );
};

/* 
KULLANIM ÖRNEĞİ:

// Ana sayfada basit kullanım:
<SectionWrapper id="home" className="min-h-screen">
  <Hero />
</SectionWrapper>

<SectionWrapper id="about" className="py-20" animationDelay={0.1}>
  <About />
</SectionWrapper>

<ScrollToTop isDarkMode={isDarkMode} />

// Manuel kullanım (eğer custom logic gerekirse):
import { useScroll } from '../hooks/useScroll';

export const CustomSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { registerSection, unregisterSection, activeSection } = useScroll();
  
  useEffect(() => {
    if (sectionRef.current) {
      registerSection('custom-section', sectionRef.current);
    }
    return () => unregisterSection('custom-section');
  }, []);
  
  const isActive = activeSection === 'custom-section';
  
  return (
    <div 
      ref={sectionRef} 
      id="custom-section"
      className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-90'}`}
    >
      Content...
    </div>
  );
};

FEATURES:
✅ Otomatik section registration/unregistration
✅ Intersection Observer ile performanslı scroll tracking
✅ Smooth scroll animasyonları (requestAnimationFrame kullanarak)
✅ Modern scroll progress tracking
✅ TypeScript desteği
✅ Easy-peasy ile state management
✅ Temiz ve re-usable API
✅ SSR uyumlu (window check'leri var)
*/