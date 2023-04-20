import React, { useRef, ReactNode } from 'react';
import useOnScroll from '../../../hooks/useOnScroll';
interface Props {
  subtitle?: ReactNode;
  title?: ReactNode;
  // any props that come into the component
}
export const Separator = ({ subtitle, title }: Props) => {

  const ref = useRef(null);
  const scale = useOnScroll(ref);

  return (
    <>
      <div className="relative h-[20vh] lg:h-[45vh] w-full bg-transparent">
        <div className="z-0 h-[20vh] lg:h-[40vh] w-full absolute top-0 separatorGradient"></div>
        <div
          ref={ref}
          className='absolute top-0 z-20 w-full h-[20vh] lg:h-[40vh] flex justify-center items-center'
          style={{ transform: `scale(${scale})`, transition: 'transform 0s' }} 
        >
          <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="saira text-md font-light text-gray-200 sm:text-lg">
                {subtitle}
                <strong className="text-5xl sm:text-6xl font-extrabold block text-gray-200">
                  {title}
                </strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
