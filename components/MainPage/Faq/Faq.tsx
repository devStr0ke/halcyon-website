import React, { useEffect, useRef, useState } from 'react';
import eventEmitter from '../../../backend/supabase/eventEmitter';
import useOnScroll from '../../../hooks/useOnScroll';
interface Props {
  title?: string | undefined;
  text?: string | undefined;
}

export const Faq = ({ title, text, ...props }: Props) => {
  const [hamburgerController, setActive] = useState(false);
  const faqRef = useRef(null);
  const ref = useRef(null);
  const scale = useOnScroll(ref);
  const toggleClass = () => {
    if (!hamburgerController) {
      eventEmitter.emit('closeOtherFaqs');
    }
    setActive(!hamburgerController);
  };

  const handleClickOutside = (event: { target: any }) => {
    // @ts-ignore
    if (!faqRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleCloseOtherFaqs = () => {
      if (hamburgerController) {
        setActive(false);
      }
    };

    eventEmitter.on('closeOtherFaqs', handleCloseOtherFaqs);

    return () => {
      eventEmitter.removeListener('closeOtherFaqs', handleCloseOtherFaqs);
    };
  }, [hamburgerController]);

  const heightClassController = () => {
    if (hamburgerController) {
      return 'h-auto sm:h-auto z-10 bg-gray-200 relative w-full rounded-lg transition-all duration-500';
    } else return 'h-auto z-10 bg-gray-200 relative w-full rounded-lg transition-all duration-500';
  };

  const textVisibilityController = () => {
    if (hamburgerController) {
      return 'w-full max-h-[165px] sm:max-h-[115px] bg-transparent rounded-b-lg flex justify-start';
    } else return 'hidden';
  };

  return (
    <>
      <div ref={ref} style={{ transform: `scale(${scale})`, transition: 'transform 0s' }}>
        <div
          ref={faqRef}
          onClick={toggleClass}
          className="top-0 bg-transparent w-full relative z-10 saira md:px-4 lg:px-24 xl:px-36 animate-textTransition cursor-pointer">
          <div className={heightClassController()}>
            <div className="w-full h-[65px] bg-gray-200 rounded-lg flex justify-start items-center">
              <div className="pl-8 text-black font-black text-md sm:text-xl lg:text-2xl">
                {title}
              </div>
            </div>
            <div className={textVisibilityController()}>
              <div className="pl-8 pr-8 pb-10 sm:pr-16 text-black font-regular xl:text-[18px] lg:text-[15px] md:text-sm sm:text-xs text-xs">
                {text}
              </div>
            </div>
            <div className="absolute space-y-1.5 top-7 right-6">
              <span
                className={
                  hamburgerController
                    ? 'block w-5 h-0.5 bg-black transition-transform duration-300 translate-y-1'
                    : 'block w-5 h-0.5 bg-black transition-transform duration-300 rotate-90 translate-y-1'
                }></span>
              <span
                className={
                  hamburgerController
                    ? 'block w-5 h-0.5 bg-black transition-transform duration-300 -translate-y-1'
                    : 'block w-5 h-0.5 bg-black transition-transform duration-300 -translate-y-1 '
                }></span>
            </div>
          </div>
          <div onClick={toggleClass} className="absolute space-y-1.5 top-7 right-6 cursor-pointer">
            <span
              className={
                hamburgerController
                  ? 'block w-5 h-0.5 bg-black transition-transform duration-300 translate-y-1'
                  : 'block w-5 h-0.5 bg-black transition-transform duration-300 rotate-90 translate-y-1'
              }></span>
            <span
              className={
                hamburgerController
                  ? 'block w-5 h-0.5 bg-black transition-transform duration-300 -translate-y-1'
                  : 'block w-5 h-0.5 bg-black transition-transform duration-300 -translate-y-1 '
              }></span>
          </div>
        </div>
      </div>
    </>
  );
};
