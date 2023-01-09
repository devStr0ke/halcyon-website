import Image from 'next/image';
import useDeviceSize from '../../hooks/windowHook';
import React, { useEffect, useState, useRef } from 'react';
export const Header = () => {

  const [windowWidth, windowHeight] = useDeviceSize();
  const opacityBlurRef = useRef(null);
  const opacityArrow = useRef(null);
  const blurBackground = useRef(null);

  const scrollToHeroSectionText = () => {
    window.scrollTo({
      top: windowHeight,
      behavior: 'smooth',
    });
  }


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // @ts-ignore
      opacityBlurRef.current.style.opacity = +scrollTop / 1000;
      // @ts-ignore
      opacityArrow.current.style.opacity = 1 - scrollTop / 330;
      // @ts-ignore
      blurBackground.current.style.filter = `blur(${scrollTop / 70}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div onClick={scrollToHeroSectionText}>
        <div className="absolute top-0 h-screen w-full z-30 flex justify-center">
          <div ref={opacityArrow} className="flex items-end py-5">
            <Image src="/static/svg/double-arrow.svg" className='animate-bounce hover:w-[45px]' alt="doubleArrow" width="40" height="100" />
          </div>
        </div>
      </div>
      <div className="relative h-[200vh] w-full">
        <div
          ref={opacityBlurRef}
          className="z-10 absolute top-0 w-full h-[200vh] opacity-0"
          style={{
            backgroundColor: 'hsla(0, 100%, 0%, 0.25)'
          }}
        ></div>
        <div
          ref={blurBackground}
          className="z-0 h-[100vh] w-full sticky top-0 bg-no-repeat bg-cover bg-[url('/static/images/heroImage.png')]"
        >
        </div>
        <div className="heroHeader sticky top-0 z-20 w-full h-[100vh] flex justify-center items-center">
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="saira text-lg font-bold sm:text-2xl">
                  Pushing The Boundaries Of Innovation
                <strong className="text-4xl sm:text-5xl font-extrabold mt-4 block text-cyan-500">
                  Web3 Experiments Studios
                </strong>
              </h1>

              <p className="saira mt-4 sm:text-lg sm:leading-relaxed">
                Halcyon is a multi-chain creation studio that specializes in building innovative Web3-based products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
