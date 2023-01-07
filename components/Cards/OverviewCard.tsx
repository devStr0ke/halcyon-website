import React, { useEffect, useState, useRef, ReactNode } from 'react';
interface Props {
  subtitle?: ReactNode;
  title?: ReactNode;
  // any props that come into the component
}
export const OverviewCard = ({ subtitle, title, ...props }: Props) => {
  const element = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('in');
          setIsAnimated(true);
        } else {
          console.log('out');
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
        <div
          ref={element}
          className="z-20 absolute h-[100vh] w-full flex justify-start lg:pl-36 lg:pr-[35vw] sm:pl-14 sm:pr-[20vw] transform scale-[0.5]"
        >
          <div className="bg-no-repeat bg-left bg-cover bg-[url('/static/images/HeroLab.png')] lg:rounded-lg w-full"></div>
        </div>
        <div className="z-20 relative h-[15vh] w-full flex justify-start lg:pl-16 lg:pr-[15vw]">
          <div className="w-full textBoxShadow text-8xl font-semibold py-3 saira flex justify-end uppercase transform scale-[0.5] opacity-0 translate-x-0">
            Building the future of Web3
          </div>
        </div>
        <div className="z-20 relative h-[15vh] w-full flex justify-start lg:pl-16 lg:pr-[15vw]">
          <div className="w-full textBoxShadow text-8xl font-semibold py-3 saira flex justify-start uppercase transform scale-[0.5] opacity-0">
            The Vision
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        ref={element}
        className="z-20 absolute h-[100vh] w-full flex justify-start lg:pl-36 lg:pr-[35vw] sm:pl-14 sm:pr-[20vw] animate-imageTransition"
      >
        <div className="bg-no-repeat bg-left bg-cover bg-[url('/static/images/HeroLab.png')] lg:rounded-lg w-full">
          <div className="h-[100vh] absolute flex justify-start items-center pl-6 sm:pl-24">
            <div className="text-4xl font-medium text-gray-400">Our</div>
          </div>
          <div className="h-[100vh] absolute flex justify-start items-center pl-6 sm:pl-24 top-12">
            <div className="textBoxShadow text-5xl font-bold">Mission</div>
          </div>
          <div className="h-[100vh] w-[300px] sm:w-96 absolute flex justify-start items-center pl-6 sm:pl-24 top-44">
            <div className="text-md font-regular">
              Web3 has immense potential and can disrupt our societies in the long run, but for now
              it is mostly dangerous. We believe that reliable and trustworthy infrastructures are
              essential to create a healthy foundation for this new decentralized internet.
            </div>
          </div>
        </div>
      </div>
      <div className="z-20 relative sm:h-[15vh] w-full flex justify-start xl:pr-[30vw] lg:pr-[20vw] sm:pr-[15vw]">
        <div className="w-full textBoxShadow px-6 lg:text-8xl sm:text-7xl text-6xl font-bold sm:py-3 saira flex justify-start sm:justify-end uppercase animate-imageTransition translate-x-0">
          Building the
        </div>
      </div>
      <div className="z-20 relative sm:h-[15vh] w-full flex justify-start xl:pl-16 lg:pl-14 sm:pl-4">
        <div className="w-full textBoxShadow px-6 sm:px-0 lg:text-8xl sm:text-7xl text-6xl font-bold sm:py-3 saira flex justify-start sm:justify-start uppercase animate-imageTransition">
          future of Web3
        </div>
      </div>
    </>
  );
};
