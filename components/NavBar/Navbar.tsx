import React, { useEffect, useState } from 'react';
import Image from 'next/image';
export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0); 
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const [hamburgerController, setActive] = useState(false); //use state for hamburger state controller (x or =)
  const toggleClass = () => {
    setActive(!hamburgerController);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();//appeller la fonction pour definir la position du scroll si user recharge la page

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navBarHeightController = () => {
    if (Math.floor(scrollPosition) > 44) {
      return 'top-[0px] bg-transparent w-full flex justify-center fixed z-[800]';
    } else {
      return 'top-[0px] bg-transparent w-full flex justify-center absolute z-[800] duration-100 lg:top-11';
    }
  };

  const navBarController = () => {
    if (Math.floor(scrollPosition) > 44) {
      return 'h-[65px] flex items-center overflow-hidden justify-center z-[800] bg-white relative w-full lg:bg-black lg:mx-44 lg:animate-slidein lg:transition-navBar lg:duration-[900ms] lg:mx-0';
    } else {
      return 'h-[65px] flex items-center justify-center overflow-hidden z-[800] bg-white relative w-full lg:mx-24 xl:mx-36 lg:rounded-md lg:animate-slidein lg:transition-navBar lg:duration-[1200ms]';
    }
  };

  const leftNavBarItemsController = () => {
    if (Math.floor(scrollPosition) > 44) {
      return 'hidden font-bold text-white absolute top-5 lg:left-2 xl:left-24 h-[45px] lg:flex gap-8 lg:ml-10 xl:ml-0';
    } else {
      return 'hidden font-bold text-black absolute top-5 lg:left-2 xl:left-24 h-[45px] animate-hideNavBarContent lg:flex gap-8 lg:ml-10 xl:ml-0';
    }
  };

  const rightNavBarItemsController = () => {
    if (Math.floor(scrollPosition) > 44) {
      return 'hidden font-bold text-white absolute top-5 lg:right-2 xl:right-24 h-[45px] lg:flex gap-8 lg:mr-10 xl:mr-0';
    } else {
      return 'hidden font-bold text-black absolute top-5 lg:right-2 xl:right-24 h-[45px] animate-hideNavBarContent lg:flex gap-8 lg:mr-10 xl:mr-0';
    }
  };


  const logoColor = () => {
    if (Math.floor(scrollPosition) < 44) {
      return '/static/svg/halcyonLogoBlack.svg';
    } else return '/static/svg/halcyonLogoWhite.svg';
  };

  return (
    <>
      {/*NavBar*/}
      <div>
        <header className={navBarHeightController()}>
          <div className={navBarController()}>
            <div className='absolute h-[65px] border-b-[3px] w-[36px] border-cyan-500'></div>
            <div className="">
              <a className='overflow-clip animate-hideImage' href="#">
                <Image
                  className="hidden lg:flex"
                  src={logoColor()}
                  alt="logolgAndUp"
                  width="40"
                  height="100"
                />
              </a>
              <a href='#'>
                <Image
                  className="lg:hidden"
                  src="/static/svg/halcyonLogoBlack.svg"
                  alt="logoDownlg"
                  width="40"
                  height="55"
                />
              </a>
              <div className={leftNavBarItemsController()}>
                <a href="#">About</a>
                <a href="#">Reviews</a>
                <a href="#">Guides</a>
                <a href="#">Info</a>
              </div>
              <div className={rightNavBarItemsController()}>
                <a href="#">Collab</a>
                <a href="#">Roadmap</a>
                <a href="#">Team</a>
                <a href="#">Contact</a>
              </div>
              <div onClick={toggleClass} className="absolute space-y-1.5 top-7 left-6 lg:hidden">
                <span
                  className={
                    hamburgerController
                      ? 'block w-5 h-0.5 bg-black transition-transform duration-300 rotate-45 translate-y-1'
                      : 'block w-5 h-0.5 bg-black transition-transform duration-300'
                  }
                ></span>
                <span
                  className={
                    hamburgerController
                      ? 'block w-5 h-0.5 bg-black transition-transform duration-300 -rotate-45 -translate-y-1'
                      : 'block w-5 h-0.5 bg-black transition-transform duration-300'
                  }
                ></span>
              </div>
            </div>
          </div>
        </header>
      </div>
      {/*Mobile Menu*/}
      <div
        className={
          hamburgerController
            ? 'lg:hidden top-[65px] h-full bg-white w-full border-t-[0.01px] border-gray-300 border-opacity-40 fixed z-[799] transform transition-transform duration-500 translate-y-0'
            : 'lg:hidden top-[65px] h-full bg-white w-full fixed z-[799] transform transition-transform duration-500 -translate-y-full'
        }
      >
        <div className="text-lg font-bold uppercase text-black flex justify-center mt-12 hover:text-cyan-400">
          <div>Reviews</div>
        </div>
        <div className="text-lg font-bold uppercase text-black flex justify-center mt-8 hover:text-cyan-400">
          <div>Guides</div>
        </div>
        <div className="text-lg font-bold uppercase text-black flex justify-center mt-8 hover:text-cyan-400">
          <div>About</div>
        </div>
        <div className="text-lg font-bold uppercase text-black flex justify-center mt-8 hover:text-cyan-400">
          <div>Services</div>
        </div>
      </div>
    </>
  );
};
