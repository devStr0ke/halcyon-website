import React, { useRef } from 'react';
import useOnScroll from '../../../utils/useOnScroll';
import useOnScrollTranslate from '../../../utils/useOnScrollTranslate';
import { useDraggable } from 'react-use-draggable-scroll';

export const Third = () => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const refscroll = useRef(null);
  const scale = useOnScroll(refscroll);
  const refTranslate = useRef(null);
  const [translateValue, translateAxis] = useOnScrollTranslate(refTranslate, 'translateY');
  const translationStyle =
  translateAxis === 'translateX'
    // @ts-ignore
    ? { transform: `translateX(${Number(translateValue * 100)}%)`, transition: 'transform 0s' }
    : translateAxis === 'negTranslateX'
    // @ts-ignore
    ? { transform: `translateX(-${Number(translateValue * 100)}%)`, transition: 'transform 0s' }
    // @ts-ignore
    : { transform: `translateY(${Number(translateValue * 30)}%)`, transition: 'transform 0s' };


  return (
    <>
      <div 
        ref={refTranslate} 
        style={translationStyle}
        className=''
      >
        <div
            {...events}
            ref={ref}
            className="lg:hidden flex w-full space-x-3 overflow-x-scroll no-scrollbar bg-transparent"
          >
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/roadmap/emergence.png')] rounded-lg w-[250px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/roadmap/establishment.png')] rounded-lg w-[250px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/roadmap/consolidation.png')] rounded-lg w-[250px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/roadmap/refinement.png')] rounded-lg w-[250px]"></div>
            <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/roadmap/newplans.png')] rounded-lg w-[250px]"></div>
        </div>
      </div>
      <div 
        ref={refscroll} 
        style={{ transform: `scale(${scale})`, transition: 'transform 0s' }} 
        className=''
      >
        <div className="hidden xl:h-[100vh] lg:h-[80vh] w-full bg-transparent lg:flex justify-center">
          <div className="bg-no-repeat xl:h-[100vh] lg:h-[80vh] bg-center bg-contain bg-[url('/static/images/ROADMAP.png')] bg-transparent rounded-lg w-[95%]"></div>
        </div>
      </div>
    </>
  );
};
