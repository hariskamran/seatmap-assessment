import { useEffect, RefObject } from 'react';

import useAppStore from '@/stores/useAppStore';
import { Section } from '@/types';

const BUFFER = 0;

export function useVisibleSections(containerRef: RefObject<HTMLDivElement | null>): Section[] {
  const sectionBounds = useAppStore(state => state.sectionBounds);
  const visibleSections = useAppStore(state => state.visibleSections);
  const setVisibleSections = useAppStore(state => state.setVisibleSections);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !sectionBounds.length) return;

    let requestId: number;

    const checkVisibility = () => {
      const { scrollLeft, scrollTop, clientWidth, clientHeight } = container;

      const visibleLeft = scrollLeft - BUFFER;
      const visibleTop = scrollTop - BUFFER;
      const visibleRight = scrollLeft + clientWidth + BUFFER;
      const visibleBottom = scrollTop + clientHeight + BUFFER;

      const visible: Section[] = [];
      for (let i = 0; i < sectionBounds.length; i++) {
        const b = sectionBounds[i];
        if (
          b.x < visibleRight &&
          b.x + b.width > visibleLeft &&
          b.y < visibleBottom &&
          b.y + b.height > visibleTop
        ) {
          visible.push(b.section);
        }
      }

      // Only update if sections actually changed
      const currentIds = visibleSections.map(s => s.id).join(',');
      const newIds = visible.map(s => s.id).join(',');

      if (currentIds !== newIds) {
        setVisibleSections(visible);
      }
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
  }, [sectionBounds]);

  return visibleSections;
}
