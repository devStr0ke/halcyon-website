import Image from 'next/image';
import React, { useEffect, useState } from 'react';
export const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const headerClassController = () => {
    if (Math.floor(scrollPosition) > 1000) {
      return 'h-screen bg-fixed bg-center bg-cover bg-no-repeat flex justify-center';
    } else {
      return 'h-screen bg-fixed bg-center bg-cover bg-no-repeat flex justify-center';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); //appeller la fonction pour definir la position du scroll si user recharge la page

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className=''>
        <header
          style={{
            backgroundImage: 'url(/static/images/heroImage.png)'
          }}
          className="h-screen bg-fixed bg-center bg-cover bg-no-repeat flex justify-center"
        >
          <div className="flex items-end">
            <h1 className="">Arrow Logo</h1>
          </div>
        </header>
        <header
          style={{
            backgroundImage: 'url(/static/images/heroImage.png)'
          }}
          className="h-screen bg-fixed bg-center bg-cover bg-no-repeat flex justify-center"
        >
          <div className="">
            <h1 className="mt-96 mb-96">Introduction</h1>
          </div>
        </header>
      </div>
    </>
  );
};
