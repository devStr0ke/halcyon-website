import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
export const Fourth = () => {
  return (
    <>
      <div className='hidden md:flex md:overflow-x-hidden -translate-x-'>
        <div className="w-full h-[340px] flex justify-around">
          <div className="h-[340px] w-[25vw] bg-transparent flex justify-center">
            <div className="flex justify-center bg-no-repeat h-[340px] bg-center bg-contain bg-[url('/static/images/Team/thounyTeam.png')] rounded-lg w-full"></div>
          </div>
          <div className="h-[340px] w-[25vw] bg-transparent">
            <div className="bg-no-repeat h-[340px] bg-center bg-contain bg-[url('/static/images/Team/aurelineTeam.png')] rounded-lg w-full"></div>
          </div>
        </div>
        <div className="hidden lg:h-[35px] lg:w-full"></div>
        <div className="w-full h-[340px] flex justify-around">
          <div className="h-[340px] w-[25vw] bg-transparent">
            <div className="bg-no-repeat h-[340px] bg-center bg-contain bg-[url('/static/images/Team/devStr0keTeam.png')] rounded-lg w-full"></div>
          </div>
          <div className="h-[340px] w-[25vw] bg-transparent">
            <div className="bg-no-repeat h-[340px] bg-center bg-contain bg-[url('/static/images/Team/matTeam.png')] rounded-lg w-full"></div>
          </div>
          <div className="h-[340px] w-[25vw] bg-transparent">
            <div className="bg-no-repeat h-[340px] bg-center bg-contain bg-[url('/static/images/Team/sajuloTeam.png')] rounded-lg w-full"></div>
          </div>
        </div>
        <div className="hidden lg:h-[35px] lg:w-full"></div>
        <div className="w-full h-[340px] flex justify-around">
          <div className="h-[340px] w-[25vw] bg-transparent">
            <div className="bg-no-repeat h-[340px] bg-center bg-contain bg-[url('/static/images/Team/shanTeam.png')] rounded-lg w-full"></div>
          </div>
          <div className="h-[340px] w-[25vw] bg-transparent">
            <div className="bg-no-repeat h-[340px] bg-center bg-contain bg-[url('/static/images/Team/virgule.png')] rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};
