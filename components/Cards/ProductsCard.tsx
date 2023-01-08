import React, { useEffect, useState, useRef, ReactNode } from 'react';
interface Props {
  // any props that come into the component
}
export const ProductsCard = ({ ...props }: Props) => {
  const element = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHover, setIsHover] = useState(false); //use state for hamburger state controller (x or =)
  const toggleClassTrue = () => {
    setIsHover(true);
  };
  const toggleClassFalse = () => {
    setIsHover(false);
  };

  const hoverClassControllerBackGroundImage = () => {
    if(isHover){
        return 'h-[60vh] w-[20vw] rounded-lg transition-productCard duration-500'
    } else return 'h-[60vh] w-[15vw] rounded-lg transition-productCard duration-500'
  }

  const hoverClassControllerTextDiv = () => {
    if(isHover){
        return 'absolute rounded-b-lg bottom-0 bg-cyan-500 opacity-40 w-[20vw] h-[60vh] rounded-lg transition-productCard duration-500'
    } else return 'absolute rounded-b-lg bottom-0 bg-cyan-500 opacity-40 w-[15vw] h-[0vh] transition-productCard duration-500'
  }

  const hoverClassTitle = () => {
    if(isHover){
        return 'absolute rounded-b-lg flex justify-center bottom-0 w-[20vw] h-[57vh] transition-productCard duration-500'
    } else return 'absolute rounded-b-lg flex justify-center bottom-0 w-[15vw] h-[10vh] transition-productCard duration-500'
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
        className={hoverClassControllerBackGroundImage()}
        onMouseEnter={toggleClassTrue}
        onMouseLeave={toggleClassFalse}
      >
        <div className="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/whitelistTool.png')] lg:rounded-lg w-full h-[60vh]"></div>
        <div className={hoverClassControllerTextDiv()}></div>
        <div className={hoverClassTitle()}>
            <div className='font-bold text-2xl textBoxShadow'>Wetlist</div>
        </div>
      </div>
    </>
  );
};
