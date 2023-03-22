import { useState, useEffect } from 'react';

export default function useOnScreen(ref) {
  const [scale, setScale] = useState(0.5); // Initialize scale at 0.5

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersectionRatio = entry.intersectionRatio;
        if(entry.boundingClientRect.y > 0) { // this is making sure that going past the component will stop the scale from going down.
          const newScale = 0.6 + intersectionRatio * 0.4;
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