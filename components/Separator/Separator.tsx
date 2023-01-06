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
          console.log('isIntersecting');
          // @ts-ignore
          element.current.classList.add('opacity-100', 'scale-100');
          setIsAnimated(true);
          observer.unobserve(entry.target);
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
        <div className="relative h-[50vh] w-full">
          <div
            className="z-20 absolute top-0 w-full h-[50vh] opacity-0"
            style={{
              backgroundColor: 'hsla(0, 0%, 100%, 0.175)'
            }}
          ></div>
          <div className="z-10 h-[50vh] w-full absolute top-0 separatorGradient"></div>
          <div ref={element} className="heroHeader absolute top-0 z-20 w-full h-[50vh] flex justify-center items-center transition opacity-0 transform scale-0">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="saira text-md font-light text-gray-500 sm:text-lg">
                  {subtitle}
                  <strong className="text-5xl sm:text-6xl font-extrabold block text-cyan-500">
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
      <div className="relative h-[50vh] w-full">
        <div
          className="z-20 absolute top-0 w-full h-[50vh] opacity-0"
          style={{
            backgroundColor: 'hsla(0, 0%, 100%, 0.175)'
          }}
        ></div>
        <div className="z-10 h-[50vh] w-full absolute top-0 separatorGradient"></div>
        <div ref={element} className="heroHeader absolute top-0 z-20 w-full h-[50vh] flex justify-center items-center transition opacity-1 transform scale-1">
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="saira text-md font-light text-gray-500 sm:text-lg">
                {subtitle}
                <strong className="text-5xl sm:text-6xl font-extrabold block text-cyan-500">
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
