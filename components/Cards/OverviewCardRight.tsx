import React, { useEffect, useState, useRef, ReactNode } from 'react';
import useOnScreen from '../../hooks/useOnScreen';
interface Props {
  sloganRight?: ReactNode;
  sloganLeft?: ReactNode;
  thinTitle?: ReactNode;
  boldTitle?: ReactNode;
  text?: ReactNode;
  // any props that come into the component
}
export const OverviewCardRight = ({
  sloganRight,
  sloganLeft,
  thinTitle,
  boldTitle,
  text,
  ...props
}: Props) => {

  const ref = useRef(null);
  const scale = useOnScreen(ref);

  
  return (
    <>
      <div 
        ref={ref}
        style={{ transform: `scale(${scale})`, transition: 'transform 0s' }} 
        className='h-[100vh]'
      >
        <div className="z-20 absolute h-[100vh] bg-transparent w-full flex justify-end lg:pr-36 lg:pl-[35vw] sm:pr-14 sm:pl-[20vw] animate-imageTransition">
          <div className="bg-no-repeat bg-center bg-cover bg-[url('/static/images/HeroHologram.png')] lg:rounded-lg w-full">
            <div className='h-[100vh] w-full flex justify-end text-right'>
              <div className="h-[100vh] absolute flex items-center pr-6 sm:pr-24">
                <div className="text-4xl font-medium flex justify-items-end text-gray-400">The</div>
              </div>
              <div className="h-[100vh] absolute flex justify-start items-center pr-6 sm:pr-24 top-12">
                <div className="textBoxShadow text-5xl font-bold text-white">Halcyon Edge</div>
              </div>
              <div className="h-[100vh] w-[300px] sm:w-96 absolute flex justify-start items-center pr-6 sm:pr-24 top-44">
                <div className="text-md font-regular text-white">
                  Web3 is a young but fast growing field, and the ecosystems related to different
                  L1s and L2s are still in their infancy. The expansion of the Web3 sphere will
                  require safeguards for investors and effective tools for builders.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="z-20 relative sm:h-[15vh] w-full flex justify-center xl:pl-[30vw] lg:pl-[25vw] sm:pl-[10vw]">
          <div className="w-full text-white textBoxShadow px-6 sm:px-0 lg:text-8xl sm:text-7xl text-6xl font-bold sm:py-3 saira flex justify-start sm:justify-start uppercase animate-imageTransition">
            One block
          </div>
        </div>
        <div className="z-20 relative sm:h-[15vh] w-full flex justify-end xl:pr-[5vw] lg:pr-[5vw] sm:pl-[15vw]">
          <div className="w-full text-white textBoxShadow px-6 lg:text-8xl sm:text-7xl text-6xl font-bold sm:py-3 saira flex justify-start sm:justify-end uppercase animate-imageTransition translate-x-0">
            at a time
          </div>
        </div>
      </div>
    </>
  );
};
