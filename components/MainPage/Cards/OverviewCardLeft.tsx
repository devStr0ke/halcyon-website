import React, { useEffect, useState, useRef, ReactNode } from 'react';
import useOnScroll from '../../../hooks/useOnScroll';
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

  const ref = useRef(null);
  const scale = useOnScroll(ref);

  
  return (
    <>
      <div 
        ref={ref} 
        style={{ transform: `scale(${scale})`, transition: 'transform 0s' }} 
        className='h-[100vh]'
      >
        <div className="z-20 absolute h-[100vh] w-full bg-transparent flex justify-start lg:pl-36 lg:pr-[35vw] sm:pl-14 sm:pr-[20vw] animate-imageTransition">
          {/* @ts-ignore */}
          <div className={backImageClass}>
            <div className="h-[100vh] absolute flex justify-start items-center pl-6 sm:pl-24">
              <div className="text-4xl font-medium text-gray-400">{thinTitle}</div>
            </div>
            <div className="h-[100vh] absolute flex justify-start items-center pl-6 sm:pl-24 top-12">
              <div className="textBoxShadow text-5xl text-gray-200 font-bold">{boldTitle}</div>
            </div>
            <div className="h-[100vh] w-[300px] sm:w-96 absolute flex justify-start items-center pl-6 sm:pl-24 top-44">
              <div className="text-md font-regular text-gray-200">
                {text}
              </div>
            </div>
          </div>
        </div>
        <div className="z-20 relative sm:h-[15vh] w-full flex justify-start xl:pr-[30vw] lg:pr-[20vw] sm:pr-[15vw]">
          <div className="w-full textBoxShadow px-6 lg:text-8xl text-gray-200 sm:text-7xl text-6xl font-bold sm:py-3 saira flex justify-start sm:justify-end uppercase animate-imageTransition translate-x-0">
            {sloganRight}
          </div>
        </div>
        <div className="z-20 relative sm:h-[15vh] w-full flex justify-start xl:pl-16 lg:pl-14 sm:pl-4">
          <div className="w-full textBoxShadow px-6 sm:px-0 lg:text-8xl text-gray-200 sm:text-7xl text-6xl font-bold sm:py-3 saira flex justify-start sm:justify-start uppercase animate-imageTransition">
            {sloganLeft}
          </div>
        </div>
      </div>
    </>
  );
};
