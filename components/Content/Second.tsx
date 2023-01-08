import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { ProductsCard } from '../Cards/ProductsCard';
export const Second = () => {
  const element = useRef(null);

  return (
    <>
      <div className='z-20 relative w-full h-[60vh]'>
        <div className='absolute w-full h-[60vh] flex justify-center gap-6'>
            <ProductsCard
              backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/logoThirsty.png')] lg:rounded-lg w-full h-[60vh]"
              title='THIRSTY MONKEYS'
              text='Discover the most vibing monkeys from our exclusive NFT Collection.'
              buttonHref='https://mobile.twitter.com/suimonkeys'
              buttonText='IM THIRSTY'
            />
            <ProductsCard
              backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/whitelistTool.png')] lg:rounded-lg w-full h-[60vh]"
              title='BOTTLE DISPENSER'
              text='Get your Wetlist via our gamified whitelisting tool on Sui devnet.'
              buttonText='SOON'
            />
            <ProductsCard />
        </div>
      </div>
    </>
  );
};
