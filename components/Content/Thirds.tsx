import React, { useState } from 'react';

interface RoadmapNavigation {
  indexNavigation: number;
  direction?: 'right' | 'left';
  addIndex: () => void;
  minusIndex: () => void;
}

interface ElmOfRoadmapInterface {
  backgroundImageDef: string;
  title: string;
  subTitle: string;
  liList: string[];
  locked: boolean;
}

const listOfRoadmapElm: ElmOfRoadmapInterface[] = [
  {
    backgroundImageDef: 'bg-roadmap-tunnel',
    title: 'Q3-2022',
    subTitle: 'REBRANDING',
    liList: ['Rebranding', 'Website v1;1', 'Patnership with Xoxno'],
    locked: false
  },
  {
    backgroundImageDef: 'bg-roadmap-man-silouette',
    title: 'Q4-2022',
    subTitle: 'WEBSITE V2',
    liList: [
      'Litepaper',
      'Discord opening',
      'Launch of our first product',
      'Beta Testers Campaign'
    ],
    locked: false
  },
  {
    backgroundImageDef: 'bg-roadmap-hexagone-nft',
    title: 'Q1-2023',
    subTitle: 'NFTs MINT 1ST BATCH',
    liList: ['Whitepaper', 'Launch of our second product', 'Nfts mint 2nd batch'],
    locked: false
  },
  {
    backgroundImageDef: 'bg-roadmap-man-silouette',
    title: 'Q2-2023',
    subTitle: 'NFTs MINT 3RD BATCH',
    liList: ['Launch of our third product', 'Nfts mint 4e batch'],
    locked: true
  },
  {
    backgroundImageDef: 'bg-roadmap-hexagone-nft',
    title: 'Q3-2023',
    subTitle: 'Launch of create your raffle',
    liList: ['Nfts mint 5e batch', 'Launch of p2p swap', 'Nfts mint 6e batch', 'Job launch'],
    locked: true
  }
];

const CarreDeNavigation = (props: RoadmapNavigation) => {
  const numberOfState = 4;
  let { indexNavigation, direction } = props;

  const indexManager = () => {
    if (direction === 'left' && indexNavigation > 0) {
      props.minusIndex();
    } else {
      props.addIndex();
    }
  };

  const NavigationOpacityManager = () => {
    if (
      (indexNavigation === 0 && direction === 'left') ||
      (indexNavigation >= numberOfState && direction === 'right')
    ) {
      return (
        <div className="h-[35px] w-[35px]">
          <div className="h-[15px] w-[15px] border-white border-t-[3px] border-r-[3px] border-solid transform rotate-45 opacity-25 disabled"></div>
        </div>
      );
    } else {
      return (
        <div className="h-[35px] w-[35px]" onClick={indexManager}>
          <div className="h-[15px] w-[15px] border-white border-t-[3px] border-r-[3px] border-solid transform rotate-45"></div>
        </div>
      );
    }
  };

  return (
    <>
      <NavigationOpacityManager />
    </>
  );
};

export const Third = () => {
  const [indexRoadmap, setCompteur] = useState(0);
  const addIndex = () => {
    setCompteur(indexRoadmap + 1);
  };

  const minusIndex = () => {
    setCompteur(indexRoadmap - 1);
  };

  const backgroundSlide = () => {
    switch (indexRoadmap) {
      case 0:
        return `translate-x-[-0%]`;
      case 1:
        return `translate-x-[-20%]`;
      case 2:
        return `translate-x-[-40%]`;
      case 3:
        return `translate-x-[-60%]`;
      case 4:
        return `translate-x-[-80%]`;
      default:
        break;
    }
  };

  const roadmapSlide = () => {
    switch (indexRoadmap) {
      case 0:
        return `translate-x-[-80%]`;
      case 1:
        return `translate-x-[-60%]`;
      case 2:
        return `translate-x-[-40%]`;
      case 3:
        return `translate-x-[-20%]`;
      case 4:
        return `translate-x-[-0%]`;
      default:
        break;
    }
  };

  const displayLiList = () => {
    return (
      <ul className="list-none">
        {listOfRoadmapElm[indexRoadmap].liList.map((itemSet) => (
          <li key={itemSet}>{itemSet}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="h-[60vh] pt-[30px] saira lg:hidden">
        <div className="h-[60vh] w-[300px] md:w-[600px] brightness-[0.90] rounded-lg mx-auto relative overflow-hidden z-0">
          <div
            className={`h-full w-[500%] absolute tansform ${backgroundSlide()} transition-transform duration-700 ease`}>
            <div
              className={`bg-[url('/static/images/Roadmap/roadmap_hexagone_nft.svg')] h-[325px] w-[300px] 
              rounded-lg md:w-[600px] bg-cover absolute
              transform translate-x-[0%]
              `}></div>
            <div
              className={`${listOfRoadmapElm[1].backgroundImageDef} h-[325px] w-[300px] 
              rounded-lg md:w-[600px] bg-contain bg-no-repeat absolute
              transform translate-x-[100%]`}></div>
            <div
              className={`${listOfRoadmapElm[2].backgroundImageDef} h-[325px] w-[300px] 
              rounded-lg md:w-[600px] bg-cover absolute 
              transition-all duration-500 linear
              transform translate-x-[200%]`}></div>
            <div
              className={`${listOfRoadmapElm[3].backgroundImageDef} h-[325px] w-[300px] 
              rounded-lg md:w-[600px] bg-cover absolute 
              transition-all duration-500 linear
              transform translate-x-[300%]`}></div>
            <div
              className={`${listOfRoadmapElm[4].backgroundImageDef} h-[325px] w-[300px] 
              rounded-lg md:w-[600px] bg-cover absolute 
              transition-all duration-500 linear
              transform translate-x-[400%]`}></div>
          </div>
          <div className="relative bg-[#ececec] h-1 rounded-full">
            <div
              className={`h-full w-full bg-gradient-to-r from-[#b8a7fc] via-[#48b1c5] to-[#008eab] 
              inset-0 absolute rounded-full ${roadmapSlide()} transition-transform duration-700 ease-out`}></div>
          </div>
          <div className="">
            <div className="flex space-x-[235px] mt-[20px] place-content-center">
              <div className="scale-x-[-1]">
                <CarreDeNavigation
                  indexNavigation={indexRoadmap}
                  direction="left"
                  addIndex={addIndex}
                  minusIndex={minusIndex}
                />
              </div>
              <div className="flex justify-end">
                <CarreDeNavigation
                  indexNavigation={indexRoadmap}
                  direction="right"
                  addIndex={addIndex}
                  minusIndex={minusIndex}
                />
              </div>
            </div>
            <div
              className="w-4/5 mx-auto relative"
              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
              <div className="flex justify-center text-[#0ab0d6] text-[30px] ">
                {listOfRoadmapElm[indexRoadmap].title}
              </div>
              <div className="flex justify-center uppercase text-white text-[23px] mt-[5px] ">
                {listOfRoadmapElm[indexRoadmap].subTitle}
              </div>
              <div className="mt-[15px] text-[16px] text-white">{displayLiList()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='xl:h-[100vh] lg:h-[80vh] w-full bg-transparent flex justify-center'>
        <div className="bg-no-repeat xl:h-[100vh] lg:h-[80vh] bg-center bg-contain bg-[url('/static/images/ROADMAP.png')] bg-transparent rounded-lg w-[95%]"></div>
      </div>
    </>
  );
};
