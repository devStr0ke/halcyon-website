import Image from 'next/image';
import useDeviceSize from '../../hooks/windowHook';
import React, { useEffect, useState, useRef } from 'react';
export const First = () => {

  const [windowWidth, windowHeight] = useDeviceSize();

  return (
    <>
      <div className="relative h-[200vh] w-full">
        <div
          className="z-20 absolute top-0 w-full h-[200vh] opacity-0"
          style={{
            backgroundColor: 'hsla(0, 0%, 100%, 0.175)'
          }}
        ></div>
        <div
          className="z-10 h-[100vh] w-full sticky top-0 bg-no-repeat bg-cover bg-[url('/static/images/heroImage.png')]"
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
