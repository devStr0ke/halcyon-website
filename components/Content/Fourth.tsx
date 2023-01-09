import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
export const Fourth = () => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const element = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        } else {
          setIsAnimated(false);
        }
      });
    });

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      if (element.current) {
        observer.unobserve(element.current);
      }
    };
  }, []);

  if (!isAnimated) {
    return (
      <>
        <div ref={element} className="opacity-0">
          <div
            {...events}
            ref={ref}
            className="flex w-full space-x-3 overflow-x-scroll no-scrollbar bg-transparent"
          >
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/thounyTeam.png')] rounded-lg w-[400px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/aurelineTeam.png')] rounded-lg w-[400px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/devStr0keTeam.png')] rounded-lg w-[400px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/shanTeam.png')] rounded-lg w-[400px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/matTeam.png')] rounded-lg w-[400px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/sajuloTeam.png')] rounded-lg w-[400px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/virgule.png')] rounded-lg w-[400px]"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div ref={element} className="animate-textTransition2">
        <div
          {...events}
          ref={ref}
          className="flex w-full space-x-3 overflow-x-scroll no-scrollbar bg-transparent"
        >
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/thounyTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/aurelineTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/devStr0keTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/shanTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/matTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/sajuloTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/virgule.png')] rounded-lg w-[400px]"></div>
        </div>
      </div>
    </>
  );
};
