import Image from 'next/image';
export const Roadmap = () => {
  return (
    <>
      <div className="bg-green-700">
        <h1 className="text-center text-black uppercase text-3xl pt-2 pb-2 sm:text-5xl sm:pt-2">
          Roadmap
        </h1>
        <div className="pt-4 pb-4">ICI JE VAIS LE CARROUSEL</div>

        <div className="bg-red-500 rounded-full h-[130px] w-[130px] mx-auto flex justify-center border-4">
          <Image
            className=""
            src="/static/svg/halcyon_logo_roadmap.svg"
            alt="logoDownlg"
            width="106"
            height="120"
          />
        </div>
      </div>
    </>
  );
};
