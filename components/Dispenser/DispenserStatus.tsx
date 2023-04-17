import { useEffect, useState } from 'react';
import { getBatchOrNot, msToDayHourMinSec } from '../../backend/dispenser/dispenserStatus';
import { useDispenserStore, useUserStore } from '../../store/store';
import { Batch } from '../../types/sui';

const DispenserStatus = () => {
  const dispenser = useDispenserStore((state) => state);
  const user = useUserStore((state) => state);

  const { startTimestamp, endTimestamp, price, priceInCoins, supply, left, testCoin, status } =
    dispenser;

  const coin = testCoin.generics.split('::').pop();

  const [timeMs, setTimeMs] = useState(0);
  const timestamp = new Date().getTime();
  const batchOrNot = getBatchOrNot(dispenser);  

  useEffect(() => {
    const intervalId = setInterval(() => {
    if (dispenser) {
      let ms;
      if (batchOrNot === Batch.Sui || batchOrNot === Batch.Coin) {
        ms = endTimestamp - timestamp;
      } else {
        ms = startTimestamp - timestamp;
      }
        setTimeMs(ms);
      }
      }, 1000);

      return () => clearInterval(intervalId);
  }, [dispenser, batchOrNot, startTimestamp, endTimestamp, timestamp]);

  const { days, hours, minutes, seconds } = msToDayHourMinSec(timeMs);

  let headline;
  if (startTimestamp > timeMs) {
    headline = <div className='flex flex-col'>
      <p>Prepare your {batchOrNot === Batch.Coin ? coin : "SUI"} coins! Next batch opens in {days} day(s), <span className='text-xl font-bold'>{hours}:{minutes}:{seconds}</span></p>
      <div className='flex flex-row mt-3'><p className='text-2xl font-bold'>{left}</p><p className='ml-2 mt-2 text-sm'>/{supply} left</p></div>
    </div>;
  } else if (batchOrNot === Batch.Coin) {
    headline = <div className='flex flex-col'>
      <p>Mint a Random Bottle for {priceInCoins / 1000000000} {coin} coins, hurry up there is only {days} day(s), <span className='text-xl font-bold'>{hours}:{minutes}:{seconds} left!</span></p>
      <div className='flex flex-row mt-3'><p className='text-2xl font-bold'>{left}</p><p className='ml-2 mt-2 text-sm'>/{supply} left</p></div>
    </div>;
  } else if (batchOrNot === Batch.Sui) {
    headline = <div className='flex flex-col'>
      <p>Mint a Random Bottle for {price / 1000000000} SUI coins, hurry up there is only {days} day(s), <span className='text-xl font-bold'>{hours}:{minutes}:{seconds} left!</span></p>
      <div className='flex flex-row mt-3'><p className='text-2xl font-bold'>{left}</p><p className='ml-2 mt-2 text-sm'>/{supply} left</p></div>
    </div>;
  } else {
    headline = <div>There is no batch open or planned at the moment, join our community to get more options!</div>;
  }

  return status === 'idle' || status === 'loading' ? (
    <div className="flex space-x-4">
      <div className="h-6 rounded flex items-center gap-4">
        <p>Loading the smart contract, please be patient.</p>
        <div className="w-6 h-6 border-t-4 border-b-4 border-cyan-500 rounded-full animate-spin"></div>
      </div>
    </div>
  ) : (
    <div className='saira'>
      {headline}
    </div>
  );
};

export default DispenserStatus;
