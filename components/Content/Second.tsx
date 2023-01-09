import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { ProductsCard } from '../Cards/ProductsCard';
import { ProductsCardMobile } from '../Cards/ProductsCardMobile';
export const Second = () => {
  const element = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        } else {
          setIsAnimated(false);
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
        <div ref={element} className="hidden bg-transparent md:flex md:z-20 md:relative md:w-full md:h-[60vh] md:scale[0.5] md:opacity-0">
          <div className="absolute w-full h-[60vh] flex justify-center gap-6">
            <ProductsCard
              backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/logoThirsty.png')] rounded-lg w-full h-[60vh]"
              title="THIRSTY MONKEYS"
              text="Discover the most vibing monkeys from our exclusive NFT Collection."
              buttonHref="https://mobile.twitter.com/suimonkeys"
              buttonText="IM THIRSTY"
            />
            <ProductsCard
              backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/whitelistTool.png')] rounded-lg w-full h-[60vh]"
              title="BOTTLE DISPENSER"
              text="Get your Wetlist via our gamified whitelisting tool on Sui devnet."
              buttonText="SOON"
            />
            <ProductsCard
              backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/cantina.png')] rounded-lg w-full h-[60vh]"
              title="DAO CANTINA"
              text="Access your own DAO space to create or join your project staking and governance."
              buttonText="SOON"
            />
          </div>
        </div>
        <div className='z-20 relative bg-transparent w-full h-[200vh] md:hidden'>
          <div className='absolute top-0 w-full h-[200vh] flex flex-col justify-center items-center gap-6 px-4'>
            <ProductsCardMobile
              backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/logoThirsty.png')] rounded-lg w-full h-[60vh]"
              title="THIRSTY MONKEYS"
              text="Discover the most vibing monkeys from our exclusive NFT Collection."
              buttonHref="https://mobile.twitter.com/suimonkeys"
              buttonText="IM THIRSTY"
            />
            <ProductsCardMobile
              backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/whitelistTool.png')] rounded-lg w-full h-[60vh]"
              title="BOTTLE DISPENSER"
              text="Get your Wetlist via our gamified whitelisting tool on Sui devnet."
              buttonText="SOON"
            />
            <ProductsCardMobile
              backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/cantina.png')] rounded-lg w-full h-[60vh]"
              title="DAO CANTINA"
              text="Access your own DAO space to create or join your project staking and governance."
              buttonText="SOON"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div ref={element} className="hidden bg-transparent md:flex md:z-20 md:relative md:w-full md:h-[60vh] md:animate-imageTransition">
        <div className="absolute w-full h-[60vh] flex justify-center gap-6">
          <ProductsCard
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/logoThirsty.png')] rounded-lg w-full h-[60vh]"
            title="THIRSTY MONKEYS"
            text="Discover the most vibing monkeys from our exclusive NFT Collection."
            buttonHref="https://mobile.twitter.com/suimonkeys"
            buttonText="IM THIRSTY"
          />
          <ProductsCard
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/whitelistTool.png')] rounded-lg w-full h-[60vh]"
            title="BOTTLE DISPENSER"
            text="Get your Wetlist via our gamified whitelisting tool on Sui devnet."
            buttonText="SOON"
          />
          <ProductsCard
            backGroundImageClass="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/cantina.png')] rounded-lg w-full h-[60vh]"
            title="DAO CANTINA"
            text="Access your own DAO space to create or join your project staking and governance."
            buttonText="SOON"
          />
        </div>
      </div>
      <div className='z-20 relative w-full h-[540px] md:hidden'>
          <div className='absolute top-0 w-full h-[540px] flex flex-col justify-start gap-6 px-4'>
            <ProductsCardMobile />
            <ProductsCardMobile />
            <ProductsCardMobile />
          </div>
      </div>
    </>
  );
};
