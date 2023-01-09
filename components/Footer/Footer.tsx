import Image from 'next/image';
import useDeviceSize from '../../hooks/windowHook';
export const Footer = () => {
  const [windowWidth, windowHeight] = useDeviceSize();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToOverview = () => {
    window.scrollTo({
      top: windowHeight * 2,
      behavior: 'smooth'
    });
  };

  const scrollToProducts = () => {
    window.scrollTo({
      top: windowHeight * 6,
      behavior: 'smooth'
    });
  };

  const scrollToRoadmap = () => {
    window.scrollTo({
      top: windowHeight * 7 + 70,
      behavior: 'smooth'
    });
  };

  const scrollToTeam = () => {
    window.scrollTo({
      top: windowHeight * 8 + 90,
      behavior: 'smooth'
    });
  };
  return (
    <footer
      aria-label="Site Footer"
      className="footerFont bg-white lg:ml-[50px] lg:mr-[50px] lg:rounded-t-lg lg:shadow-xl">
      <div className="grid grid-cols-3">
        <div className="py-8 px-4 lg:px-8">
          <div className="text-black text-sm md:text-lg font-bold uppercase">Explore</div>
          <div
            onClick={scrollToOverview}
            className="text-black text-xs md:text-sm uppercase mt-3 cursor-pointer hover:text-cyan-500">
            Overview
          </div>
          <div
            onClick={scrollToProducts}
            className="text-black text-xs md:text-sm uppercase mt-1 cursor-pointer hover:text-cyan-500">
            Products
          </div>
          <div
            onClick={scrollToRoadmap}
            className="text-black text-xs md:text-sm uppercase mt-1 cursor-pointer hover:text-cyan-500">
            Roadmap
          </div>
          <div
            onClick={scrollToTeam}
            className="text-black text-xs md:text-sm uppercase mt-1 cursor-pointer hover:text-cyan-500">
            Team
          </div>
        </div>
        <div className="py-16 place-self-center cursor-pointer">
          <Image
            onClick={scrollToTop}
            className=""
            src="/static/svg/halcyonLogoBlack.svg"
            alt="logoDownlg"
            width="55"
            height="55"
          />
        </div>
        <div className="py-8 px-4 lg:px-8">
          <div className="text-black text-sm md:text-lg font-bold uppercase text-end">
            Stay Tuned
          </div>
          <div className="text-black text-xs md:text-sm uppercase mt-3 text-end cursor-pointer hover:text-cyan-500">
            <a target="_blank" rel="noreferrer" href="https://mobile.twitter.com/suimonkeys">
              Twitter
            </a>
          </div>
          <div className="text-black text-xs md:text-sm uppercase mt-1 text-end cursor-pointer hover:text-cyan-500">
            <a target="_blank" rel="noreferrer" href="https://discord.gg/ypBUcMn2Cm">
              Discord
            </a>
          </div>
          <div className="text-black text-xs md:text-sm uppercase mt-1 text-end cursor-pointer hover:text-cyan-500">
            Whitepaper
          </div>
          <div className="text-black text-xs md:text-sm uppercase mt-1 text-end cursor-pointer hover:text-cyan-500">
            Contact
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-300 mx-8"></div>
      <div className="flex justify-between">
        <div className="py-2 px-4 lg:px-8">
          <div className="text-black text-sm md:text-md font-bold uppercase">Halcyon Project</div>
          <div className="text-gray-500 text-xs md:text-sm font-extralight uppercase mt-1">
            Halcyon 2023 ©
          </div>
        </div>
        <div className="py-2 px-4 lg:px-8">
          <div className="text-black text-sm md:text-md font-bold uppercase text-end">
            Enquiries
          </div>
          <div className="text-gray-500 text-xs md:text-sm font-extralight underline uppercase mt-1 text-end">
            coming soon
          </div>
        </div>
      </div>
    </footer>
  );
};
