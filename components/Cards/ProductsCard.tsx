import React, { useEffect, useState, useRef, ReactNode } from 'react';
interface Props {
  // any props that come into the component
  title?: ReactNode;
  text?: ReactNode;
  imageClass?: ReactNode;
  buttonText?: ReactNode;
  buttonHref?: ReactNode;
  backGroundImageClass?: ReactNode;
}
export const ProductsCard = ({title, text, imageClass, buttonText, buttonHref, backGroundImageClass, ...props }: Props) => {
  const element = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHover, setIsHover] = useState(false); //use state for hamburger state controller (x or =)
  const toggleClassTrue = () => {
    setIsHover(true);
  };
  const toggleClassFalse = () => {
    setIsHover(false);
  };

  const hoverClassMainDiv = () => {
    if(isHover){
        return 'h-[60vh] w-[20vw] rounded-lg transition-productCard duration-500 saira'
    } else return 'h-[60vh] w-[15vw] rounded-lg transition-productCard duration-500 saira'
  }

  const hoverClassBlueDiv = () => {
    if(isHover){
        return 'absolute bottom-0 bg-cyan-500 opacity-70 w-[20vw] h-[60vh] rounded-lg transition-productCard duration-500'
    } else return 'absolute rounded-lg bottom-0 bg-cyan-500 opacity-70 w-[15vw] h-[0vh] transition-productCard duration-500'
  }

  const hoverClassTitle = () => {
    if(isHover){
        return 'absolute rounded-b-lg flex justify-center bottom-0 w-[20vw] h-[57vh] transition-productCard duration-500'
    } else return 'absolute rounded-b-lg flex justify-center bottom-0 w-[15vw] h-[10vh] transition-productCard duration-500'
  }

  const hoverClassText = () => {
    if(isHover){
        return 'absolute rounded-b-lg flex justify-center items-center bottom-0 w-[20vw] h-[60vh] transition-productCard duration-500 animate-textTransition2'
    } else return 'hidden'
  }

  const hoverClassButton = () => {
    if(isHover){
        return 'absolute bg-transparent flex justify-center bottom-5 w-[20vw] h-[10vh] animate-textTransition2'
    } else return 'hidden'
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('in');
          setIsAnimated(true);
        } else {
          console.log('out');
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

  return (
    <>
      <div
        ref={element}
        className={hoverClassMainDiv()}
        onMouseEnter={toggleClassTrue}
        onMouseLeave={toggleClassFalse}
      >
        {/* @ts-ignore */}
        <div className={backGroundImageClass}></div>
        <div className={hoverClassBlueDiv()}></div>
        <div className={hoverClassTitle()}>
            <div className='font-bold text-xl textBoxShadow'>{title}</div>
        </div>
        <div className={hoverClassText()}>
            <div className='font-semibold text-lg text-center px-4'>{text}</div>
        </div>
        <div className={hoverClassButton()}>
            <div className='w-[10vw] h-[5vh] bg-white rounded-lg flex justify-center items-center cursor-pointer hover:border-2 hover:border-cyan-500'>
                {/* @ts-ignore */}
                <a target='_blank' href={buttonHref} className='absolute w-[10vw] h-[5vh]'></a>
                <div className='font-semibold text-cyan-500 text-lg text-center px-4'>{buttonText}</div>
            </div>
        </div>
      </div>
    </>
  );
};
