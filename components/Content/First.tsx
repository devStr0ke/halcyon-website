import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
export const First = () => {
  const element = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
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
        <div className="relative h-[300vh] w-full">
          <div
            className="z-20 absolute top-0 w-full h-[200vh] opacity-0"
            style={{
              backgroundColor: 'hsla(0, 0%, 100%, 0.175)'
            }}
          ></div>
          <div ref={element} className="z-10 h-[100vh] sticky top-0 bg-no-repeat bg-cover rounded-lg bg-[url('/static/images/HeroLab.png')] transform scale-[0.5]"></div>
          <div className="heroHeader absolute top-0 z-20 w-full h-[100vh] flex justify-center items-center">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="saira text-lg font-bold sm:text-2xl">
                  Pushing The Boundaries Of Innovation
                  <strong className="text-4xl sm:text-5xl font-extrabold mt-4 block text-cyan-500">
                    Web3 Experiments Studios
                  </strong>
                </h1>

                <p className="saira mt-4 sm:text-lg sm:leading-relaxed">
                  Halcyon is a multi-chain creation studio that specializes in building innovative
                  Web3-based products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative h-[300vh] w-full">
        <div
          className="z-20 absolute top-0 w-full h-[200vh] opacity-0"
          style={{
            backgroundColor: 'hsla(0, 0%, 100%, 0.175)'
          }}
        ></div>
        <div ref={element} className="z-10 h-[100vh] sticky top-0 bg-no-repeat bg-cover rounded-lg bg-[url('/static/images/HeroLab.png')] animate-imageTransition"></div>
        <div className="heroHeader absolute top-0 z-20 w-full h-[100vh] flex justify-center items-center">
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="saira text-lg font-bold sm:text-2xl">
                Pushing The Boundaries Of Innovation
                <strong className="text-4xl sm:text-5xl font-extrabold mt-4 block text-cyan-500">
                  Web3 Experiments Studios
                </strong>
              </h1>

              <p className="saira mt-4 sm:text-lg sm:leading-relaxed">
                Halcyon is a multi-chain creation studio that specializes in building innovative
                Web3-based products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
