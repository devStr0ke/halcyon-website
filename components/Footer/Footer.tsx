import Image from 'next/image';
export const Footer = () => {
  return (
    <footer
      aria-label="Site Footer"
      className="footerFont bg-gray-100 lg:ml-[50px] lg:mr-[50px] lg:rounded-t-lg lg:shadow-xl"
    >
      <div className="grid grid-cols-3">
        <div className="py-8 px-4 lg:px-8">
          <div className="text-black text-sm md:text-lg font-bold uppercase">Explore</div>
          <div className="text-black text-xs md:text-sm uppercase mt-3">Home</div>
          <div className="text-black text-xs md:text-sm uppercase mt-1">About</div>
          <div className="text-black text-xs md:text-sm uppercase mt-1">Roadmap</div>
          <div className="text-black text-xs md:text-sm uppercase mt-1">Team</div>
        </div>
        <div className="py-16 place-self-center">
            <Image
              className=""
              src="/static/svg/halcyonLogoBlack.svg"
              alt="logoDownlg"
              width="55"
              height="55"
            />
        </div>
        <div className="py-8 px-4 lg:px-8">
          <div className="text-black text-sm md:text-lg font-bold uppercase text-end">Stay Tuned</div>
          <div className="text-black text-xs md:text-sm uppercase mt-3 text-end">Twitter</div>
          <div className="text-black text-xs md:text-sm uppercase mt-1 text-end">Discord</div>
          <div className="text-black text-xs md:text-sm uppercase mt-1 text-end">Whitepaper</div>
          <div className="text-black text-xs md:text-sm uppercase mt-1 text-end">Contact</div>
        </div>
      </div>
      <div className="border-t-2 border-gray-300 mx-8"></div>
      <div className="flex justify-between">
        <div className="py-2 px-4 lg:px-8">
          <div className="text-black text-sm md:text-md font-bold uppercase">Halcyon Project</div>
          <div className="text-gray-500 text-xs md:text-sm font-extralight uppercase mt-1">Halcyon 2023 ©</div>
        </div>
        <div className="py-2 px-4 lg:px-8">
          <div className="text-black text-sm md:text-md font-bold uppercase text-end">Enquiries</div>
          <div className="text-gray-500 text-xs md:text-sm font-extralight underline uppercase mt-1 text-end">halcyonproject@gmail.com</div>
        </div>
      </div>
    </footer>
  );
};
