import { useEffect, RefObject } from 'react';

import useAppStore from '@/stores/useAppStore';

export function useVisibleSections(containerRef: RefObject<HTMLDivElement | null>) {
  const updateVisibility = useAppStore(state => state.updateVisibility);
  const spatialGrid = useAppStore(state => state.spatialGrid);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let requestId: number;

    const checkVisibility = () => {
      const { scrollLeft, scrollTop, clientWidth, clientHeight } = container;
      updateVisibility({ scrollLeft, scrollTop, clientWidth, clientHeight });
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
  }, [updateVisibility, spatialGrid]);
}
