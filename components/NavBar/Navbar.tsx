import React, { useEffect, useState } from "react";
import Image from "next/image";
export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const [hamburgerController, setActive] = useState(false) //use state for hamburger state controller (x or =)
  const toggleClass = () => {
    setActive(!hamburgerController)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navBarClass = () => {
    if (Math.floor(scrollPosition) < 44) {
      return "z-50 sticky top-0 bg-white h-16 mx-0 flex justify-center lg:bg-white lg:mt-11 lg:h-16 lg:transition-navBar lg:duration-[1500ms] lg:animate-slidein lg:mx-16 lg:mx-24 xl:mx-36";
    } else {
      return "z-50 sticky top-0 bg-white h-16 mx-0 flex justify-center lg:bg-white lg:mt-11 lg:h-16 lg:transition-navBar lg:duration-[1500ms] lg:animate-slidein xl:mx-44 lg:sticky lg:top-0 lg:bg-black lg:mx-0 lg:mx-0 xl:mx-0";
    }
  };

  const logoColor = () => {
    if (Math.floor(scrollPosition) < 44) {
      return "/static/svg/halcyonLogoBlack.svg"
    } else return "/static/svg/halcyonLogoWhite.svg"
  }

  return (
    <>
      {/*NavBar*/}
      <div className={navBarClass()}>
        <div className="flex items-center bg-transparent overflow-hidden">
          <div className="flex items-center h-16">
            <Image className="hidden lg:flex" src={logoColor()} alt="logolgAndUp" width="45" height="100" />
            <Image className="absolute top-2.2 left-6 lg:hidden" src="/static/svg/halcyonLogoBlack.svg" alt="logoDownlg" width="40" height="55" />
            <div onClick={toggleClass} className="absolute space-y-1.5 top-7 right-6 lg:hidden">
              <span className={hamburgerController ? 'block w-5 h-0.5 bg-black transition-transform duration-300 rotate-45 translate-y-1' : 'block w-5 h-0.5 bg-black transition-transform duration-300'}></span>
              <span className={hamburgerController ? 'block w-5 h-0.5 bg-black transition-transform duration-300 -rotate-45 -translate-y-1' : 'block w-5 h-0.5 bg-black transition-transform duration-300'}></span>
            </div>
          </div>
        </div>
      </div>
      {/*Mobile Menu*/}
      <div className={hamburgerController ? 'xl:hidden top-[65px] h-full bg-white w-full fixed z-[999] transform transition-transform duration-500 translate-x-0' : 'xl:hidden top-[65px] h-full bg-white w-full fixed z-[999] transform transition-transform duration-500 -translate-x-full'}>
        <div className="text-lg uppercase text-black flex justify-center mt-12 hover:text-purple-800">
          <div>Reviews</div>
        </div>
        <div className="text-lg uppercase text-black flex justify-center mt-8 hover:text-purple-800">
          <div>Guides</div>
        </div>
        <div className="text-lg uppercase text-black flex justify-center mt-8 hover:text-purple-800">
          <div>About</div>
        </div>
        <div className="text-lg uppercase text-black flex justify-center mt-8 hover:text-purple-800">
          <div>Services</div>
        </div>
      </div>
    </>
  );
};
