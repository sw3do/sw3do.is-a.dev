import { createStore, action, Action } from 'easy-peasy';
import type { 
  ScrollState, 
  ScrollToSectionOptions,
  ScrollToTopOptions
} from '../types/scroll';

interface ScrollModel extends ScrollState {
  setActiveSection: Action<ScrollModel, string>;
  setShowScrollTop: Action<ScrollModel, boolean>;
  setIsScrolling: Action<ScrollModel, boolean>;
  setScrollProgress: Action<ScrollModel, number>;
  registerSection: Action<ScrollModel, { sectionId: string; element: HTMLElement }>;
  unregisterSection: Action<ScrollModel, string>;
  updateSectionVisibility: Action<ScrollModel, { sectionId: string; isVisible: boolean }>;
  cleanup: Action<ScrollModel>;
}

const smoothScrollTo = (
  targetY: number, 
  duration: number = 800,
  onComplete?: () => void
): void => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animate = (currentTime: number): void => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startY + distance * easedProgress);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };

  requestAnimationFrame(animate);
};

const scrollModel: ScrollModel = {
  activeSection: 'home',
  showScrollTop: false,
  isScrolling: false,
  scrollProgress: 0,
  sections: {},

  setActiveSection: action((state, payload) => {
    state.activeSection = payload;
  }),

  setShowScrollTop: action((state, payload) => {
    state.showScrollTop = payload;
  }),

  setIsScrolling: action((state, payload) => {
    state.isScrolling = payload;
  }),

  setScrollProgress: action((state, payload) => {
    state.scrollProgress = payload;
  }),

  registerSection: action((state, { sectionId, element }) => {
    state.sections[sectionId] = {
      id: sectionId,
      element,
      offset: element.offsetTop,
      isVisible: false
    };
  }),

  unregisterSection: action((state, sectionId) => {
    delete state.sections[sectionId];
  }),

  updateSectionVisibility: action((state, { sectionId, isVisible }) => {
    if (state.sections[sectionId]) {
      state.sections[sectionId].isVisible = isVisible;
    }
  }),

  cleanup: action((state) => {
    state.sections = {};
    state.isScrolling = false;
    state.activeSection = 'home';
    state.showScrollTop = false;
    state.scrollProgress = 0;
  })
};

const storeModel = {
  scroll: scrollModel
};

export const store = createStore(storeModel);

export type Store = typeof store;

export const scrollToSection = (sectionId: string, options: ScrollToSectionOptions = {}) => {
  const {
    behavior = 'smooth',
    offset = 80,
    duration = 600
  } = options;

  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Section "${sectionId}" not found`);
    return;
  }

  store.getActions().scroll.setIsScrolling(true);
  store.getActions().scroll.setActiveSection(sectionId);
  
  const targetY = Math.max(0, element.offsetTop - offset);

  if (behavior === 'smooth') {
    smoothScrollTo(targetY, duration, () => {
      store.getActions().scroll.setIsScrolling(false);
    });
  } else {
    window.scrollTo({ top: targetY, behavior });
    setTimeout(() => {
      store.getActions().scroll.setIsScrolling(false);
    }, 50);
  }
};

export const scrollToTop = (options: ScrollToTopOptions = {}) => {
  const { behavior = 'smooth', duration = 500 } = options;
  
  store.getActions().scroll.setIsScrolling(true);
  store.getActions().scroll.setActiveSection('home');

  if (behavior === 'smooth') {
    smoothScrollTo(0, duration, () => {
      store.getActions().scroll.setIsScrolling(false);
    });
  } else {
    window.scrollTo({ top: 0, behavior });
    setTimeout(() => {
      store.getActions().scroll.setIsScrolling(false);
    }, 50);
  }
};