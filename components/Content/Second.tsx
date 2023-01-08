import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { ProductsCard } from '../Cards/ProductsCard';
export const Second = () => {
  const element = useRef(null);

  return (
    <>
      <div className='z-20 relative w-full h-[60vh]'>
        <div className='absolute w-full h-[60vh] flex justify-center gap-6'>
            <ProductsCard />
            <ProductsCard />
            <ProductsCard />
        </div>
      </div>
    </>
  );
};
