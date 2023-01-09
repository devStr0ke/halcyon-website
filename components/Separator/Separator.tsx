import React, { useEffect, useState, useRef, ReactNode } from 'react';
interface Props {
  subtitle?: ReactNode;
  title?: ReactNode;
  // any props that come into the component
}
export const Separator = ({ subtitle, title, ...props }: Props) => {
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
        <div className="relative h-[20vh] lg:h-[45vh] w-full bg-transparent">
          <div className="z-0 h-[20vh] lg:h-[40vh] w-full absolute top-0 separatorGradient"></div>
          <div
            ref={element}
            className="absolute top-0 z-20 w-full h-[20vh] lg:h-[40vh] flex justify-center items-center transition opacity-1 transform scale-0"
          >
            <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="saira text-md font-light text-gray-200 sm:text-lg">
                  {subtitle}
                  <strong className="text-5xl sm:text-6xl font-extrabold block text-white">
                    {title}
                  </strong>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative h-[20vh] lg:h-[45vh] w-full bg-transparent">
        <div className="z-0 h-[20vh] lg:h-[40vh] w-full absolute top-0 separatorGradient"></div>
        <div
          ref={element}
          className="absolute top-0 z-20 w-full h-[20vh] lg:h-[40vh] flex justify-center items-center transition opacity-1 transform scale-1 animate-imageTransition"
        >
          <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="saira text-md font-light text-gray-200 sm:text-lg">
                {subtitle}
                <strong className="text-5xl sm:text-6xl font-extrabold block text-white">
                  {title}
                </strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
