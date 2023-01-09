import React, { useEffect, useState, useRef, ReactNode } from 'react';
import Image from 'next/image';
interface Props {
  // any props that come into the component
  title?: ReactNode;
  text?: ReactNode;
  imageClass?: ReactNode;
  buttonText?: ReactNode;
  buttonHref?: ReactNode;
  backGroundImageClass?: ReactNode;
}
export const ProductsCardMobile = ({
  title,
  text,
  imageClass,
  buttonText,
  buttonHref,
  backGroundImageClass,
  ...props
}: Props) => {
  const [isClick, setisClick] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const element = useRef(null);
  const toggleClass = () => {
    setisClick(!isClick);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        } else {
          setIsAnimated(false);
        }
      });
    });

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      if (element.current) {
        observer.unobserve(element.current);
      }
    };
  }, []);

  const hoverClassMainDiv = () => {
    if (isClick) {
      return 'h-[60vh] bg-transparent relative w-[80vw] rounded-lg transition-productCard duration-500 saira';
    } else return 'h-[60vh] bg-transparent relative w-[65vw] rounded-lg transition-productCard duration-500 saira';
  };

  const hoverClassBlueDiv = () => {
    if (isClick) {
      return 'absolute bottom-0 bg-cyan-900 opacity-70 w-[80vw] h-[60vh] rounded-lg transition-productCard duration-500';
    } else
      return 'absolute bottom-0 bg-cyan-900 opacity-70 w-[65vw] h-[0vh] rounded-lg transition-productCard duration-500';
  };

  const hoverClassTitle = () => {
    if (isClick) {
      return 'absolute rounded-b-lg flex justify-center bottom-0 w-[80vw] h-[57vh] transition-productCard duration-500';
    } else
      return 'absolute rounded-b-lg flex justify-center bottom-0 w-[65vw] h-[10vh] transition-productCard duration-500';
  };

  const hoverClassArrow = () => {
    if (isClick) {
      return 'absolute rounded-b-lg flex justify-center bottom-0 w-[80vw] h-[5vh] transition-productCard duration-500 rotate-180';
    } else
      return 'absolute rounded-b-lg flex justify-center bottom-0 w-[65vw] h-[5vh] transition-productCard duration-500';
  };

  const hoverClassText = () => {
    if (isClick) {
      return 'absolute rounded-b-lg flex justify-center items-center bottom-0 w-[80vw] h-[60vh] transition-productCard duration-500 animate-textTransition2';
    } else return 'hidden';
  };

  const hoverClassButton = () => {
    if (isClick) {
      return 'absolute bg-transparent flex justify-center bottom-5 w-[80vw] h-[10vh] animate-textTransition2';
    } else return 'hidden';
  };

  if (!isAnimated) {
    return (
      <>
        <div ref={element} className="scale-[0.5] opacity-0">
          <div className={hoverClassMainDiv()} onClick={toggleClass}>
            {/* @ts-ignore */}
            <div className={backGroundImageClass}></div>
            <div className={hoverClassBlueDiv()}></div>
            <div className={hoverClassTitle()}>
              <div className="font-bold text-xl textBoxShadow text-white">{title}</div>
            </div>
            <div className={hoverClassArrow()}>
              <Image src="/static/svg/chevron-down.svg" alt="logoDownlg" width="20" height="20" />
            </div>
            <div className={hoverClassText()}>
              <div className="font-semibold text-md text-center px-4 text-white">{text}</div>
            </div>
            <div className={hoverClassButton()}>
              <div className="w-[45vw] h-[5vh] bg-white rounded-lg flex justify-center items-center cursor-pointer hover:border-2 hover:border-cyan-500">
                {/* @ts-ignore */}
                <a target="_blank" href={buttonHref} rel="noreferrer" className="absolute w-[10vw] h-[5vh]"></a>
                <div className="font-semibold text-cyan-500 text-lg text-center px-4">
                  {buttonText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div ref={element} className="animate-imageTransition">
        <div className={hoverClassMainDiv()} onClick={toggleClass}>
          {/* @ts-ignore */}
          <div className={backGroundImageClass}></div>
          <div className={hoverClassBlueDiv()}></div>
          <div className={hoverClassTitle()}>
            <div className="font-bold text-xl textBoxShadow text-white">{title}</div>
          </div>
          <div className={hoverClassArrow()}>
            <Image src="/static/svg/chevron-down.svg" alt="logoDownlg" width="20" height="20" />
          </div>
          <div className={hoverClassText()}>
            <div className="font-semibold text-md text-center px-4 text-white">{text}</div>
          </div>
          <div className={hoverClassButton()}>
            <div className="w-[45vw] h-[5vh] bg-white rounded-lg flex justify-center items-center cursor-pointer hover:border-2 hover:border-cyan-500">
              {/* @ts-ignore */}
              <a target="_blank" href={buttonHref} rel="noreferrer" className="absolute w-[10vw] h-[5vh]"></a>
              <div className="font-semibold text-cyan-500 text-lg text-center px-4">
                {buttonText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
