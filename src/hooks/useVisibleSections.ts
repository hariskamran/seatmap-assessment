import { useEffect, RefObject } from 'react';

import useAppStore from '@/stores/useAppStore';
import { Section } from '@/types';

export function useVisibleSections(containerRef: RefObject<HTMLDivElement | null>): Section[] {
  const sectionBounds = useAppStore(state => state.sectionBounds);
  const visibleSections = useAppStore(state => state.visibleSections);
  const updateVisibleSections = useAppStore(state => state.updateVisibleSections);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !sectionBounds.length) return;

    let requestId: number;

    const checkVisibility = () => {
      const { scrollLeft, scrollTop, clientWidth, clientHeight } = container;
      updateVisibleSections({ scrollLeft, scrollTop, clientWidth, clientHeight });
    };

    const onScroll = () => {
      if (requestId) cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(checkVisibility);
    };

    checkVisibility();

    const observer = new ResizeObserver(checkVisibility);
    observer.observe(container);
    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', onScroll);
      observer.disconnect();
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, [sectionBounds, updateVisibleSections]);

  return visibleSections;
}
