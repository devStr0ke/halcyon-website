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
  const element = useRef(null);
  const [isHover, setIsHover] = useState(false); //use state for hamburger state controller (x or =)
  const toggleClassTrue = () => {
    setIsHover(true);
  };
  const toggleClassFalse = () => {
    setIsHover(false);
  };

  return (
    <>
      <div className='h-[250px] w-full bg-red-500 text-center rounded-lg'>Hello</div>
    </>
  );
};
