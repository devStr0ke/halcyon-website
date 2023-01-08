import React, { useEffect, useState, useRef, ReactNode } from 'react';
interface Props {
  sloganRight?: ReactNode;
  sloganLeft?: ReactNode;
  thinTitle?: ReactNode;
  boldTitle?: ReactNode;
  text?: ReactNode;
  backImageClass?: ReactNode;
  // any props that come into the component
}
export const OverviewCardLeft = ({
  sloganRight,
  sloganLeft,
  thinTitle,
  boldTitle,
  text,
  backImageClass,
  ...props
}: Props) => {
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
        <div ref={element} className='h-[100vh]'>
          <div
            className="z-20 absolute h-[100vh] w-full flex justify-start lg:pl-36 lg:pr-[35vw] sm:pl-14 sm:pr-[20vw] transform scale-[0.5]"
          >
            <div className="bg-no-repeat bg-left bg-cover bg-[url('/static/images/HeroLab.png')] sm:rounded-lg w-full"></div>
          </div>
          <div className="z-20 relative h-[15vh] w-full flex justify-start lg:pl-16 lg:pr-[15vw]">
            <div className="w-full textBoxShadow text-8xl font-semibold py-3 saira flex justify-end uppercase transform scale-[0] translate-x-0">
              {sloganRight}
            </div>
          </div>
          <div className="z-20 relative h-[15vh] w-full flex justify-start lg:pl-16 lg:pr-[15vw]">
            <div className="w-full textBoxShadow text-8xl font-semibold py-3 saira flex justify-start uppercase transform scale-[0]">
              {sloganLeft}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div ref={element} className='h-[100vh]'>
        <div className="z-20 absolute h-[100vh] w-full flex justify-start lg:pl-36 lg:pr-[35vw] sm:pl-14 sm:pr-[20vw] animate-imageTransition">
          {/* @ts-ignore */}
          <div className={backImageClass}>
            <div className="h-[100vh] absolute flex justify-start items-center pl-6 sm:pl-24">
              <div className="text-4xl font-medium text-gray-400">{thinTitle}</div>
            </div>
            <div className="h-[100vh] absolute flex justify-start items-center pl-6 sm:pl-24 top-12">
              <div className="textBoxShadow text-5xl font-bold">{boldTitle}</div>
            </div>
            <div className="h-[100vh] w-[300px] sm:w-96 absolute flex justify-start items-center pl-6 sm:pl-24 top-44">
              <div className="text-md font-regular">
                {text}
              </div>
            </div>
          </div>
        </div>
        <div className="z-20 relative sm:h-[15vh] w-full flex justify-start xl:pr-[30vw] lg:pr-[20vw] sm:pr-[15vw]">
          <div className="w-full textBoxShadow px-6 lg:text-8xl sm:text-7xl text-6xl font-bold sm:py-3 saira flex justify-start sm:justify-end uppercase animate-imageTransition translate-x-0">
            {sloganRight}
          </div>
        </div>
        <div className="z-20 relative sm:h-[15vh] w-full flex justify-start xl:pl-16 lg:pl-14 sm:pl-4">
          <div className="w-full textBoxShadow px-6 sm:px-0 lg:text-8xl sm:text-7xl text-6xl font-bold sm:py-3 saira flex justify-start sm:justify-start uppercase animate-imageTransition">
            {sloganLeft}
          </div>
        </div>
      </div>
    </>
  );
};
