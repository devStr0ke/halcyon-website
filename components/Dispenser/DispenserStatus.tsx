import { useEffect, useState } from 'react';
import { getBatchOrNot, msToDayHourMinSec } from '../../backend/dispenser/dispenserStatus';
import { useDispenserStore, useUserStore } from '../../store/store';
import { BatchOrNot } from '../../types/suiDispenser';

const DispenserStatus = () => {
  const dispenser = useDispenserStore((state) => state);
  const user = useUserStore((state) => state);

  const { startTimestamp, endTimestamp, price, priceInCoins, supply, left, testCoin, status } =
    dispenser;

  const coin = testCoin.generics.split('::').pop();

  const [timeMs, setTimeMs] = useState(0);
  const timestamp = new Date().getTime();
  const batchOrNot = getBatchOrNot(dispenser, user);

  useEffect(() => {
    const intervalId = setInterval(() => {
    if (dispenser) {
      let ms;
      if (batchOrNot === BatchOrNot.SuiTime || batchOrNot === BatchOrNot.CoinTime) {
        ms = endTimestamp - timestamp;
      } else {
        ms = timestamp - startTimestamp;
      }
        setTimeMs(ms);
      }
      }, 1000);

      return () => clearInterval(intervalId);
  }, [dispenser, batchOrNot, startTimestamp, endTimestamp, timestamp]);

  const { days, hours, minutes, seconds } = msToDayHourMinSec(timeMs);

  let headline;
  if (batchOrNot === BatchOrNot.SuiSupply) {
    headline = <div className='flex'><div>Mint a Random Bottle for ${
      price / 1000000000
    } $SUI, hurry up there are only</div><div className='text-4xl ml-5'>{left} left!</div></div>;
  } else if (batchOrNot === BatchOrNot.SuiTime) {
    headline = <div className='flex'><div>Mint a Random Bottle for ${
      price / 1000000000
    } $SUI, hurry up there is only {days} day(s), </div><div className='text-4xl ml-5'>{hours}:{minutes}:{seconds} left!</div></div>;
  } else if (batchOrNot === BatchOrNot.CoinSupply) {
    headline = <div className='flex'><div>Mint a Random Bottle for ${
      priceInCoins / 1000000000
    } $${coin}, hurry up there are only</div><div className='text-4xl ml-5'>{left} left!</div></div>;
  } else if (batchOrNot === BatchOrNot.CoinTime) {
    headline = <div className='flex'><div>Mint a Random Bottle for ${
      priceInCoins / 1000000000
    } $${coin}, hurry up there is only {days} day(s), </div><div className='text-4xl ml-5'>{hours}:{minutes}:{seconds} left!</div></div>;
  } else if (startTimestamp !== 0) {
    headline = <div className='flex'><div>Next batch opens in {days} day(s), </div><div className='text-4xl ml-5'>{hours}:{minutes}:{seconds}</div></div>;
  } else {
    headline =
      <div>There is no batch open or planned at the moment, join our community to get more options!</div>;
  }

  return status === 'idle' || status === 'loading' ? (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 bg-slate-400 rounded"></div>
        <div className="h-3 bg-slate-400 rounded w-1/5"></div>
      </div>
    </div>
  ) : (
    <div className='saira'>
      {headline}
    </div>
  );
};

export default DispenserStatus;
