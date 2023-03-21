import { useState, useEffect } from 'react';

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let prevEntryY = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (prevEntryY === null) {
          prevEntryY = entry.boundingClientRect.y;
          return;
        }

        const scrollDirection =
          entry.boundingClientRect.y > prevEntryY ? 'up' : 'down';
        prevEntryY = entry.boundingClientRect.y;

        if (entry.isIntersecting && scrollDirection === 'down') {
          setIntersecting(true);
        } else if (!entry.isIntersecting && scrollDirection === 'up') {
          setIntersecting(false);
        }
      },
      {
        threshold: 0,
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

  return isIntersecting;
}