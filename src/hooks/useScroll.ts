import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { scrollToSection as scrollToSectionUtil, scrollToTop as scrollToTopUtil } from '../stores/scrollStore';

interface UseScrollOptions {
  threshold?: number | number[];
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
    threshold = [0.1, 0.5, 0.9],
    rootMargin = '-80px 0px -30% 0px',
    showScrollTopOffset = 300
  } = options;

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasSetInitialSection, setHasSetInitialSection] = useState(false);

  const scrollState = useStoreState((state: { scroll: { activeSection: string; showScrollTop: boolean; isScrolling: boolean; scrollProgress: number } }) => state.scroll);
  const { activeSection, showScrollTop, isScrolling, scrollProgress } = scrollState;
  
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
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    
    if (Math.abs(scrollTop - lastScrollY.current) < 5) return;
    
    lastScrollY.current = scrollTop;
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
    if (!ticking.current) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        
        if (isInitialLoad && window.scrollY > 50) {
          window.scrollTo(0, 0);
          setActiveSection('home');
        }
        
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [updateScrollProgress, isInitialLoad, setActiveSection]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (isScrolling || isInitialLoad) return;

    let highestVisibleSection = '';
    let highestRatio = 0;
    let centerMostSection = '';
    let centerMostDistance = Infinity;
    const viewportCenter = window.innerHeight / 2;

    for (const entry of entries) {
      const sectionId = entry.target.id;
      const isVisible = entry.isIntersecting;
      
      updateSectionVisibility({ sectionId, isVisible });

      if (isVisible) {
        const rect = entry.boundingClientRect;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
        
        if (entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          highestVisibleSection = sectionId;
        }
        
        if (distanceFromCenter < centerMostDistance && entry.intersectionRatio > 0.1) {
          centerMostDistance = distanceFromCenter;
          centerMostSection = sectionId;
        }
      }
    }

    const targetSection = centerMostSection || highestVisibleSection;
    if (targetSection && targetSection !== activeSection) {
      setActiveSection(targetSection);
    }
  }, [isScrolling, isInitialLoad, activeSection, setActiveSection, updateSectionVisibility]);

  const registerSection = useCallback((sectionId: string, element: HTMLElement) => {
    if (observedElementsRef.current.has(sectionId)) return;
    
    registerSectionAction({ sectionId, element });
    
    if (intersectionObserverRef.current) {
      const observeElement = () => {
        if (intersectionObserverRef.current && !observedElementsRef.current.has(sectionId)) {
          intersectionObserverRef.current.observe(element);
          observedElementsRef.current.add(sectionId);
        }
      };

      if (isInitialLoad && sectionId !== 'home') {
        setTimeout(observeElement, 800);
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
    
    const timeoutId = setTimeout(handleInitialScroll, 50);
    
    return () => clearTimeout(timeoutId);
  }, [handleInitialScroll]);

  const observerOptions = useMemo(() => ({
    threshold,
    rootMargin
  }), [threshold, rootMargin]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setupObserver = () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
      
      intersectionObserverRef.current = new IntersectionObserver(
        handleIntersection,
        observerOptions
      );
    };

    const timeoutId = setTimeout(setupObserver, 50);

    return () => {
      clearTimeout(timeoutId);
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [handleIntersection, observerOptions]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollOptions = { passive: true, capture: false };
    window.addEventListener('scroll', handleScroll, scrollOptions);
    
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll, scrollOptions);
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