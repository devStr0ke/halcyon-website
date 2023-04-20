import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { ProductsCard } from '../Cards/ProductsCard';
import { ProductsCardMobile } from '../Cards/ProductsCardMobile';
export const Second = () => {

  return (
    <>
      <div
        className='hidden bg-transparent md:flex md:z-20 md:relative md:w-full md:h-[60vh]'
      >
        <div className="absolute w-full h-[60vh] flex justify-center gap-6">
          <ProductsCard
            translateType='negTranslateX'
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/logoThirsty.png')] rounded-lg w-full h-[60vh]"
            title="THIRSTY MONKEYS"
            text="Discover the most vibing monkeys from our membership NFT Collection."
            buttonHref="https://mobile.twitter.com/suimonkeys"
            buttonText="IM THIRSTY"
            external
            insider={false}
          />
          <ProductsCard
            translateType='translateY'
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/whitelistTool.png')] rounded-lg w-full h-[60vh]"
            title="BOTTLE DISPENSER"
            text="Get your Wetlist via our gamified on-chain whitelisting tool on Sui."
            buttonHref='/dispenser'
            buttonText="DISPENSER"
            external={false}
            insider
          />
          <ProductsCard
            translateType='translateX'
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/cantina.png')] rounded-lg w-full h-[60vh]"
            title="CANTINA"
            text="A community engagement data aggregator and D-ID system with turnkey tools for Web3 projects, designed to bridge Web2 platforms and foster growth and collaboration across the ecosystem."
            buttonText="SOON"
            external={false}
            insider
          />
        </div>
      </div>
      <div className="z-20 relative bg-transparent w-full h-[200vh] md:hidden">
        <div className="absolute top-0 w-full h-[200vh] flex flex-col justify-center items-center gap-6 px-4">
          <ProductsCardMobile
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/logoThirsty.png')] rounded-lg w-full h-[60vh]"
            title="THIRSTY MONKEYS"
            text="Discover the most vibing monkeys from our exclusive NFT Collection."
            buttonHref="https://mobile.twitter.com/suimonkeys"
            buttonText="IM THIRSTY"
            external
            insider={false}
          />
          <ProductsCardMobile
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/whitelistTool.png')] rounded-lg w-full h-[60vh]"
            title="BOTTLE DISPENSER"
            text="Get your Wetlist via our gamified whitelisting tool on Sui devnet."
            buttonHref='/testPage'
            buttonText="SOON"
            external={false}
            insider
          />
          <ProductsCardMobile
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/cantina.png')] rounded-lg w-full h-[60vh]"
            title="DAO CANTINA"
            text="Access your project staking and governance or create your own DAO space."
            buttonText="SOON"
            external={false}
            insider
          />
        </div>
      </div>
    </>
  );
};
