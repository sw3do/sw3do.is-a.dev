export interface ScrollSection {
  id: string;
  element: HTMLElement | null;
  offset: number;
  isVisible: boolean;
}

export interface ScrollState {
  activeSection: string;
  showScrollTop: boolean;
  isScrolling: boolean;
  scrollProgress: number;
  sections: Record<string, ScrollSection>;
}

export interface ScrollActions {
  setActiveSection: (sectionId: string) => void;
  setShowScrollTop: (show: boolean) => void;
  setIsScrolling: (scrolling: boolean) => void;
  setScrollProgress: (progress: number) => void;
  registerSection: (sectionId: string, element: HTMLElement) => void;
  unregisterSection: (sectionId: string) => void;
  scrollToSection: (sectionId: string, options?: ScrollToSectionOptions) => void;
  scrollToTop: (options?: ScrollToTopOptions) => void;
  updateSectionVisibility: (sectionId: string, isVisible: boolean) => void;
  cleanup: () => void;
}

export interface ScrollToSectionOptions {
  behavior?: ScrollBehavior;
  offset?: number;
  duration?: number;
}

export interface ScrollToTopOptions {
  behavior?: ScrollBehavior;
  duration?: number;
}

export interface ScrollStore extends ScrollState, ScrollActions {}

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'stats' | 'terminal' | 'contact'; 