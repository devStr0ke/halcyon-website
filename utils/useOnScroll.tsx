import { useState, useEffect } from 'react';

export default function useOnScroll(ref: any) {
  const [scale, setScale] = useState(1); // Initialize scale at 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersectionRatio = entry.intersectionRatio;
        if(entry.boundingClientRect.y > 0) { // this is making sure that going past the component will stop the scale from going down.
          const newScale = 0.5 + intersectionRatio * 0.5;
          setScale(newScale);
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

  return scale;
}