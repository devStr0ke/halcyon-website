import { useState, useEffect } from 'react';

export default function useOnScroll(ref: any, translateType = 'translateY') {
  const [translateValue, setTranslateValue] = useState(0); // Initialize translateValue at 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersectionRatio = entry.intersectionRatio;
        if (entry.boundingClientRect.y > 0) {
          const newTranslateValue = 1 - intersectionRatio;
          setTranslateValue(newTranslateValue);
        }
      },
      {
        threshold: Array.from({ length: 100 }, (_, index) => index / 100),
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return [translateValue, translateType];
}
