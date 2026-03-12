import { useState, useEffect, RefObject } from 'react';

export const useOnScreen = (ref: RefObject<HTMLDivElement | null>, rootMargin = '0px') => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [isCurrentlyIntersecting, setIsCurrentlyIntersecting] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;

    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCurrentlyIntersecting(entry.isIntersecting);
        // Once element becomes visible, mark it as having been visible
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
        }
      },
      {
        rootMargin,
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);

  // Return true if element has ever been visible, or is currently visible
  return hasBeenVisible || isCurrentlyIntersecting;
};
