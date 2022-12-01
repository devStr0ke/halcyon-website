import React, { useEffect, useState } from "react";
import Image from "next/image";
export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navBarClass = () => {
    if (Math.floor(scrollPosition) < 44) {
      return "sticky top-0 bg-red-500 h-18 mx-0 flex justify-center md:bg-red-500 md:mt-11 md:h-16 md:transition-navBar md:duration-[1500ms] md:animate-slidein md:mx-16 lg:mx-24 xl:mx-36";
    } else {
      return "sticky top-0 bg-red-500 h-18 mx-0 flex justify-center md:bg-red-500 md:mt-11 md:h-16 md:transition-navBar md:duration-[1500ms] md:animate-slidein xl:mx-44 md:sticky md:top-0 md:bg-blue-500 md:mx-0 lg:mx-0 xl:mx-0";
    }
  };

  return (
    <div className={navBarClass()}>
      <div className="h-16 flex items-center bg-transparent overflow-hidden">
        <div className="flex md:gap-[500px]">
          <Image src="/static/images/halcyonFull.png" alt="logo" width="220" height="100" />
        </div>
      </div>
    </div>
  );
};
