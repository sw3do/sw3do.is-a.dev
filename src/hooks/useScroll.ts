import { useEffect, useCallback, useRef, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { scrollToSection as scrollToSectionUtil, scrollToTop as scrollToTopUtil } from '../stores/scrollStore';

interface UseScrollOptions {
  threshold?: number;
  rootMargin?: string;
  showScrollTopOffset?: number;
}

interface UseScrollReturn {
  activeSection: string;
  showScrollTop: boolean;
  isScrolling: boolean;
  scrollProgress: number;
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
  registerSection: (sectionId: string, element: HTMLElement) => void;
  unregisterSection: (sectionId: string) => void;
}

export const useScroll = (options: UseScrollOptions = {}): UseScrollReturn => {
  const {
    threshold = 0.3,
    rootMargin = '-80px 0px -50% 0px',
    showScrollTopOffset = 300
  } = options;

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasSetInitialSection, setHasSetInitialSection] = useState(false);

  const activeSection = useStoreState((state: { scroll: { activeSection: string } }) => state.scroll.activeSection);
  const showScrollTop = useStoreState((state: { scroll: { showScrollTop: boolean } }) => state.scroll.showScrollTop);
  const isScrolling = useStoreState((state: { scroll: { isScrolling: boolean } }) => state.scroll.isScrolling);
  const scrollProgress = useStoreState((state: { scroll: { scrollProgress: number } }) => state.scroll.scrollProgress);
  
  const {
    setActiveSection,
    setShowScrollTop,
    setScrollProgress,
    registerSection: registerSectionAction,
    unregisterSection: unregisterSectionAction,
    updateSectionVisibility,
    cleanup
  } = useStoreActions((actions: { scroll: { 
    setActiveSection: (payload: string) => void;
    setShowScrollTop: (payload: boolean) => void;
    setScrollProgress: (payload: number) => void;
    registerSection: (payload: { sectionId: string; element: HTMLElement }) => void;
    unregisterSection: (sectionId: string) => void;
    updateSectionVisibility: (payload: { sectionId: string; isVisible: boolean }) => void;
    cleanup: () => void;
  } }) => actions.scroll);

  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observedElementsRef = useRef<Set<string>>(new Set());
  const initialScrollHandledRef = useRef(false);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    setScrollProgress(progress);
    setShowScrollTop(scrollTop > showScrollTopOffset);
  }, [setScrollProgress, setShowScrollTop, showScrollTopOffset]);

  const handleInitialScroll = useCallback(() => {
    if (initialScrollHandledRef.current) return;
    
    window.scrollTo(0, 0);
    
    if (!hasSetInitialSection) {
      setActiveSection('home');
      setHasSetInitialSection(true);
    }
    
    initialScrollHandledRef.current = true;
    
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
  }, [setActiveSection, hasSetInitialSection]);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      updateScrollProgress();
      
      if (isInitialLoad && window.scrollY > 50) {
        window.scrollTo(0, 0);
        setActiveSection('home');
      }
    }, 16);
  }, [updateScrollProgress, isInitialLoad, setActiveSection]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (isScrolling || isInitialLoad) return;

    let highestVisibleSection = '';
    let highestRatio = 0;

    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      const isVisible = entry.isIntersecting;
      
      updateSectionVisibility({ sectionId, isVisible });

      if (isVisible && entry.intersectionRatio > highestRatio) {
        highestRatio = entry.intersectionRatio;
        highestVisibleSection = sectionId;
      }
    });

    if (highestVisibleSection && highestVisibleSection !== activeSection) {
      setActiveSection(highestVisibleSection);
    }
  }, [isScrolling, isInitialLoad, activeSection, setActiveSection, updateSectionVisibility]);

  const registerSection = useCallback((sectionId: string, element: HTMLElement) => {
    registerSectionAction({ sectionId, element });
    
    if (intersectionObserverRef.current && !observedElementsRef.current.has(sectionId)) {
      const observeElement = () => {
        if (intersectionObserverRef.current) {
          intersectionObserverRef.current.observe(element);
          observedElementsRef.current.add(sectionId);
        }
      };

      if (isInitialLoad && sectionId !== 'home') {
        setTimeout(observeElement, 1200);
      } else {
        observeElement();
      }
    }
  }, [registerSectionAction, isInitialLoad]);

  const unregisterSection = useCallback((sectionId: string) => {
    unregisterSectionAction(sectionId);
    
    if (intersectionObserverRef.current && observedElementsRef.current.has(sectionId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        intersectionObserverRef.current.unobserve(element);
      }
      observedElementsRef.current.delete(sectionId);
    }
  }, [unregisterSectionAction]);

  const scrollToSection = useCallback((sectionId: string) => {
    scrollToSectionUtil(sectionId, { offset: 80 });
  }, []);

  const scrollToTop = useCallback(() => {
    scrollToTopUtil();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    handleInitialScroll();
    
    const timeoutId = setTimeout(handleInitialScroll, 100);
    
    return () => clearTimeout(timeoutId);
  }, [handleInitialScroll]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setupObserver = () => {
      intersectionObserverRef.current = new IntersectionObserver(
        handleIntersection,
        {
          threshold,
          rootMargin
        }
      );
    };

    const timeoutId = setTimeout(setupObserver, 500);

    return () => {
      clearTimeout(timeoutId);
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, updateScrollProgress]);

  useEffect(() => {
    const currentObservedElements = observedElementsRef.current;
    
    return () => {
      cleanup();
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      currentObservedElements.clear();
    };
  }, [cleanup]);

  return {
    activeSection,
    showScrollTop,
    isScrolling,
    scrollProgress,
    scrollToSection,
    scrollToTop,
    registerSection,
    unregisterSection
  };
}; 