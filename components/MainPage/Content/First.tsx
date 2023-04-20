import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { OverviewCardLeft } from '../Cards/OverviewCardLeft';
import { OverviewCardRight } from '../Cards/OverviewCardRight';
export const First = () => {
  const element = useRef(null);

  return (
    <>
      <div className="relative h-[360vh] w-full bg-transparent">
        <div className="relative">
          <OverviewCardLeft
            sloganRight="Building The"
            sloganLeft="Future of Web 3"
            thinTitle="Our"
            boldTitle="Mission"
            text="Web3 has immense potential and can disrupt our societies in the long run, but for
            now it is mostly dangerous. We believe that reliable and trustworthy infrastructures
            are essential to create a healthy foundation for this new decentralized internet."
            backImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/HeroLab.png')] sm:rounded-lg w-full"
          />
        </div>
        <div className="relative pt-52">
          <OverviewCardRight />
        </div>
        <div className="relative pt-52">
          <OverviewCardLeft
            sloganRight="Limitless"
            sloganLeft="Potential"
            thinTitle="Our"
            boldTitle="Identity"
            text="Halcyon is a Web3 development studio that will bring together 
            the aspirations of investors and the ambitions of builders while federating a knowledgeable 
            community."
            backImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/HeroWarp.jpg')] sm:rounded-lg w-full"
          />
        </div>
      </div>
    </>
  );
};
