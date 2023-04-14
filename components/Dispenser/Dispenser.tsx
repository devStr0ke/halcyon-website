import { useEffect, useRef } from 'react';
import { useModalStore } from '../../store/store';
import Image from 'next/image';

import DispenserDrawing from './DispenserDrawing';

import Connection from '../Connection/Connection';
import ResultModal from '../ResultModal/ResultModal';
import useDeviceSize from '../../hooks/windowHook';

const Dispenser = () => {
  const [windowWidth, windowHeight] = useDeviceSize();
  const opacityBlurRef = useRef(null);
  const opacityTitle = useRef(null);
  const opacityArrow = useRef(null);
  const blurBackground = useRef(null);

  const scrollToHeroSectionText = () => {
    window.scrollTo({
      top: windowHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // @ts-ignore
      opacityBlurRef.current.style.opacity = +scrollTop / 1000;
      // @ts-ignore
      opacityTitle.current.style.opacity = 1 - scrollTop / 300;
      // @ts-ignore
      opacityArrow.current.style.opacity = 1 - scrollTop / 300;
      // @ts-ignore
      blurBackground.current.style.filter = `blur(${scrollTop / 70}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isModalOpened } = useModalStore((state) => state);

  // Disable scrolling while modal is opened
  useEffect(() => {
    if (isModalOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpened]);

  return (
    <>
      <div onClick={scrollToHeroSectionText}>
        <div className="absolute top-0 h-screen w-full z-30 flex justify-center">
          <div ref={opacityArrow} className="flex items-end py-4 text-red-500">
            <Image
              src="/static/svg/double-arrow-black.svg"
              className="animate-bounce hover:w-[45px]"
              alt="doubleArrow"
              width="40"
              height="100"
            />
          </div>
        </div>
        <div className="absolute top-0 h-screen w-full z-30 flex justify-center">
          <div ref={opacityTitle} className="flex items-center py-5">
            <div className="mx-auto px-4 py-20 lg:flex lg:h-screen lg:items-end">
              <div className="mx-auto text-center">
                <h1 className="saira text-black text-lg font-extrabold sm:text-3xl">
                  Welcome To The Bottle Dispenser!
                </h1>
                <div className="lg:mx-8 p-6 mt-4 bg-gray-200 rounded-lg">
                  <p className="saira sm:text-md sm:leading-relaxed text-black">
                    The Dispenser is a gamified on-chain whitelisting tool allowing Sui community
                    members to get tokenized Wetlists in the form of Bottles NFTs for our Thirsty
                    Monkeys collection.
                  </p>
                  <p className="saira sm:text-md sm:leading-relaxed text-black">
                    Get a Filled Bottle and burn it to register your Wetlist. Many mechanisms have
                    been implemented to allow everyone to get Bottles!
                  </p>
                  <strong className="text-lg sm:text-2xl font-bold mt-1 block text-black">
                    <p>How does it works ?</p>
                  </strong>
                  <p className="saira sm:text-md sm:leading-relaxed text-black">
                    Wait for a batch to open and buy random bottles with $SUI
                    <br />
                    Recycle five empty bottles to get a free entry
                    <br />
                    Win a Voucher during a Mint Event and swap it for a filled bottle
                    <br />
                    Participate in an IDO Event to get coins and buy random bottles
                    <br />
                    Earn a Thirsty or Wetlist role on Discord to claim a filled bottle
                    <br />
                    Win Enthusiast roles on Discord to claim random bottles <br />
                  </p>
                  <p className="saira sm:text-md sm:leading-relaxed text-black">
                    Read more{' '}
                    <a
                      className="text-cyan-600"
                      href="https://medium.com/@HalcyonBuilders/one-small-step-for-halcyon-one-giant-leap-for-web3-330064894efb">
                      in this article
                    </a>{' '}
                    and join us{' '}
                    <a className="text-cyan-600" href="https://discord.gg/ZbQ3TPbzPT">
                      on Discord
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[250vh] w-full">
        <div ref={opacityBlurRef} className="z-10 absolute top-0 w-full h-[200vh] opacity-0"></div>
        <div ref={blurBackground} className="z-0 h-[100vh] w-full sticky top-0 bg-no-repeat"></div>
        <div className="hidden lg:block heroHeader sticky top-0 z-20 w-full h-[100vh]">
          {isModalOpened && <ResultModal />}
          <div className="border-2 border-red-400 bg-red-100 mt-20 mx-16 p-2 rounded-md">
            <p className="text-red-700 text-center">
              Our Dapp is in its early development phase and running on Sui Testnet which is still experimental. As we fine-tune the experience, you might encounter some hiccups. Kindly share any issues on our Discord. Let&apos;s build together!
            </p>
          </div>
          <div className="mx-16 mt-8">
            <Connection />
          </div>
          <div className="mx-16 mt-8">
            <DispenserDrawing />
          </div>
          {/* {session && currentAccount !== null && status === 'succeeded' && <DiscordRoles />} */}
        </div>
        <div className="w-full h-[100vh] flex justify-center items-center text-red-400 font-bold lg:hidden">
          The dispenser is made to be used on desktop only!
        </div>
      </div>
    </>
  );
};

export default Dispenser;
