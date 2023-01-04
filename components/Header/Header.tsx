import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
export const Header = () => {
  const opacityBlurRef = useRef(null);
  const opacityArrow = useRef(null);
  const blurBackground = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // @ts-ignore
      opacityBlurRef.current.style.opacity = +scrollTop / 1000;
      // @ts-ignore
      opacityArrow.current.style.opacity = 1 - scrollTop/330
      // @ts-ignore
      blurBackground.current.style.filter = `blur(${scrollTop / 200}px)`;
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="absolute top-0 h-screen w-full z-30 flex justify-center">
        <div
          ref={opacityArrow}
          className="flex items-end py-5"
        >
          <Image src="/static/svg/ARROW.svg" alt="logolgAndUp" width="40" height="100" />
        </div>
      </div>
      <div className="relative h-[200vh] w-full">
        <div
          ref={opacityBlurRef}
          className="z-20 absolute top-0 w-full h-[200vh] opacity-0"
          style={{
            backgroundColor: "hsla(0, 0%, 100%, 0.1)"
          }}
          ></div>
        <div
          ref={blurBackground}
          className="z-10 h-[100vh] w-full sticky top-0 bg-[url('/static/images/heroImage.png')]"
        ></div>
        <div className='heroHeader text-3xl font-bold sticky top-0 z-10 w-full h-[100vh] flex flex-col justify-center items-center'>
          <div className="w-[900px] h-16 text-center">Web3 Experiments Studios</div>
          <div className="w-[900px] h-16 text-center">Halcyon is a multi-chain creation studio for Web3-based innovative products.</div>
        </div>
      </div>
    </>
  );
};
