import { useEffect, useState } from 'react';
import { getBatchOrNot, msToDayHourMinSec } from '../../../backend/dispenser/dispenserStatus';
import { useDispenserStore } from '../../../store/dispenserStore';
import { Batch } from '../../../types/dispenserTypes';
import { useUserStore } from '../../../store/userStore';

const BatchStatus = () => {
  const dispenser = useDispenserStore((state) => state);
  const { testCoinDecimals } = useUserStore((state) => state);
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
        if (startTimestamp > timestamp) {
          ms = startTimestamp - timestamp;
        } else {
          ms = endTimestamp - timestamp;
        }
        setTimeMs(ms);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispenser, batchOrNot, startTimestamp, endTimestamp, timestamp]);

  const { days, hours, minutes, seconds } = msToDayHourMinSec(timeMs);

  let headline;
  if (startTimestamp > timestamp) {
    headline = (
      <div className="flex flex-col">
        <p>
          Prepare your {batchOrNot === Batch.Coin ? coin : 'SUI'} coins! Next batch opens in {days}{' '}
          day(s),{' '}
          <span className="text-sm sm:text-md md:text-lg lg:text-2xl font-bold">
            {hours}:{minutes}:{seconds}
          </span>
        </p>
        <div className="mt-1 flex flex-row justify-center lg:justify-start">
          <p className="text-xl lg:text-3xl font-bold">{left}</p>
          <p className="mx-1 lg:ml-2 mt-1 lg:mt-2">/{supply} left</p>
        </div>
      </div>
    );
  } else if (batchOrNot === Batch.Coin) {
    headline = (
      <div className="flex flex-col">
        <p>
          Mint a Random Bottle for {priceInCoins / Math.pow(10, testCoinDecimals)} {coin} coins,
          hurry up there is only {days} day(s),{' '}
          <span className="text-sm sm:text-md md:text-lg lg:text-2xl font-bold">
            {hours}:{minutes}:{seconds} left!
          </span>
        </p>
        <div className="mt-1 flex flex-row justify-center lg:justify-start">
          <p className="text-xl lg:text-3xl font-bold">{left}</p>
          <p className="mx-1 lg:ml-2 mt-1 lg:mt-2">/{supply} left</p>
        </div>
      </div>
    );
  } else if (batchOrNot === Batch.Sui) {
    headline = (
      <div className="flex flex-col">
        <p>
          Mint a Random Bottle for {price / 1000000000} SUI coins, hurry up there is only {days}{' '}
          day(s),{' '}
          <span className="text-sm sm:text-md md:text-lg lg:text-2xl font-bold">
            {hours}:{minutes}:{seconds} left!
          </span>
        </p>
        <div className="mt-1 flex flex-row justify-center lg:justify-start">
          <p className="text-xl lg:text-3xl font-bold">{left}</p>
          <p className="mx-1 lg:ml-2 mt-1 lg:mt-2">/{supply} left</p>
        </div>
      </div>
    );
  } else {
    headline = (
      <div>
        There is no batch open or planned at the moment, join our community to get more options!
      </div>
    );
  }

  return status === 'idle' || status === 'loading' ? (
    <div className="flex justify-center lg:justify-start space-x-4">
      <div className="saira flex h-6 items-center gap-4 rounded">
        <p>Loading the smart contract, please be patient.</p>
        <div className="h-6 w-6 animate-spin rounded-full border-b-4 border-t-4 border-cyan-500"></div>
      </div>
    </div>
  ) : (
    <div className="mt-2 lg:mt-0 saira text-sm md:text-md lg:text-base ml-0 flex w-full justify-center text-center lg:justify-start lg:text-left">
      {headline}
    </div>
  );
};

export default BatchStatus;
