import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import useOnScrollTranslate from '../../hooks/useOnScrollTranslate';
export const Fourth = () => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const element = useRef(null);
  const [translateValue, translateAxis] = useOnScrollTranslate(element, 'translateY');
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
        ref={element} 
        className="animate-textTransition2"
        style={translationStyle}
      >
        <div
          {...events}
          ref={ref}
          className="flex w-full space-x-3 overflow-x-scroll no-scrollbar bg-transparent"
        >
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/thounyTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/aurelineTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/devStr0keTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/shanTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/matTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/sajuloTeam.png')] rounded-lg w-[400px]"></div>
          <div className="flex-none bg-no-repeat h-96 bg-center bg-contain bg-[url('/static/images/Team/virgule.png')] rounded-lg w-[400px]"></div>
        </div>
      </div>
    </>
  );
};
