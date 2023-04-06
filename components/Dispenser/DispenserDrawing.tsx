import { useState } from 'react';
import { useUserStore, useDispenserStore } from '../../store/store';
import { useSendTx } from '../../backend/dispenser/useSendTx'

const DispenserDrawing = () => {
  const { testCoinIds, filledBottleIds, emptyBottleIds, ticketIds } = useUserStore(
    (state) => state
  );
  const { active, price, supply, balance, left } = useDispenserStore((state) => state);
  const {
    buyRandomBottle,
    buyRandomBottleWithCoins,
    claimFilledBottle,
    claimRandomBottle,
    recycle,
    register,
    swapNft
  } = useSendTx();

  return (
    <div className=''>
      <div className="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/distributeur.png')] p-6 rounded-lg w-full h-[90vh] flex flex-col justify-end">
        <div className="w-full grid grid-cols-2 gap-4">
          <button
            disabled={active === false || left === 0}
            onClick={async () => buyRandomBottleWithCoins()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
            Buy
          </button>
          <button
            disabled={emptyBottleIds.length < 5}
            onClick={() => console.log('recycle')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
            Recycle
          </button>
          <button
            disabled={ticketIds.length === 0}
            onClick={() => console.log('swap')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
            Swap
          </button>
          <button
            disabled={false}
            onClick={() => console.log('claim')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default DispenserDrawing;
