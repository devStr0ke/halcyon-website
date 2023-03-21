import { useState } from 'react';
import { useUserStore, useDispenserStore } from '../../store/store';

const DispenserDrawing = () => {
  const { coinObjectId, filledBottleIds, emptyBottleIds, wwMonkeyIds } = useUserStore(
    (state) => state
  );
  const { active, price, supply, balance, left } = useDispenserStore((state) => state);

  return (
    <div className="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/distributeur.png')] p-6 rounded-lg w-full h-full flex flex-col justify-end">
      <div className="w-full grid grid-cols-2 gap-4">
        <button
          disabled={active === false || left === 0}
          onClick={() => console.log('buy')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy
        </button>
        <button
          disabled={emptyBottleIds.length < 5}
          onClick={() => console.log('recycle')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Recycle
        </button>
        <button
          disabled={wwMonkeyIds.length === 0}
          onClick={() => console.log('swap')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Swap
        </button>
        <button
          disabled={false}
          onClick={() => console.log('claim')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Claim
        </button>
      </div>
    </div>
  );
};

export default DispenserDrawing;
