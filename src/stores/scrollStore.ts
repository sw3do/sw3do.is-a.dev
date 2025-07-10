/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, action } from 'easy-peasy';

let scrollTimeoutId: NodeJS.Timeout | null = null;
let topTimeoutId: NodeJS.Timeout | null = null;
let debounceTimeoutId: NodeJS.Timeout | null = null;

const scrollModel = {
  activeSection: 'home',
  showScrollTop: false,
  isScrolling: false,

  setActiveSection: action((state: any, payload: string) => {
    if (!state.isScrolling) {
      state.activeSection = payload;
    }
  }),

  setShowScrollTop: action((state: any, payload: boolean) => {
    state.showScrollTop = payload;
  }),

  setIsScrolling: action((state: any, payload: boolean) => {
    state.isScrolling = payload;
  }),

  scrollToSection: action((state: any, sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    if (scrollTimeoutId) {
      clearTimeout(scrollTimeoutId);
    }
    
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }

    state.isScrolling = true;

    debounceTimeoutId = setTimeout(() => {
      try {
        state.activeSection = sectionId;
        debounceTimeoutId = null;
      } catch {
        console.warn('Store unmounted during debounce timeout');
        debounceTimeoutId = null;
      }
    }, 50);

    const offsetTop = element.offsetTop - 80;
    
    window.scrollTo({
      top: Math.max(0, offsetTop),
      behavior: 'smooth'
    });

    scrollTimeoutId = setTimeout(() => {
      try {
        state.isScrolling = false;
        if (state.activeSection !== sectionId) {
          state.activeSection = sectionId;
        }
        scrollTimeoutId = null;
      } catch {
        console.warn('Store unmounted during scroll timeout');
      }
    }, 800);
  }),

  scrollToTop: action((state: any) => {
    if (topTimeoutId) {
      clearTimeout(topTimeoutId);
    }
    
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }

    state.isScrolling = true;
    
    debounceTimeoutId = setTimeout(() => {
      try {
        state.activeSection = 'home';
        debounceTimeoutId = null;
      } catch {
        console.warn('Store unmounted during debounce timeout');
        debounceTimeoutId = null;
      }
    }, 50);
    
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
    
    topTimeoutId = setTimeout(() => {
      try {
        state.isScrolling = false;
        if (state.activeSection !== 'home') {
          state.activeSection = 'home';
        }
        topTimeoutId = null;
      } catch {
        console.warn('Store unmounted during scroll timeout');
      }
    }, 600);
  }),

  forceSetActiveSection: action((state: any, payload: string) => {
    state.activeSection = payload;
  }),

  cleanup: action(() => {
    if (scrollTimeoutId) {
      clearTimeout(scrollTimeoutId);
      scrollTimeoutId = null;
    }
    if (topTimeoutId) {
      clearTimeout(topTimeoutId);
      topTimeoutId = null;
    }
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
      debounceTimeoutId = null;
    }
  }),
};

const storeModel = {
  scroll: scrollModel
};

export const store = createStore(storeModel); 