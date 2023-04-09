import { getBatchOrNot, useGetTime } from '../../backend/dispenser/dispenserStatus';
import { useDispenserStore, useUserStore } from '../../store/store';
import { BatchOrNot } from '../../types/suiDispenser';

const DispenserStatus = () => {
  const dispenser = useDispenserStore((state) => state);
  const user = useUserStore((state) => state);

  const { startTimestamp, endTimestamp, price, priceInCoins, supply, left, testCoin, status } =
    dispenser;

  const coin = testCoin.generics.split('::').pop();

  const timestamp = new Date().getTime();
  const batchOrNot = getBatchOrNot(dispenser, user);

  let ms;
  if (batchOrNot === BatchOrNot.SuiTime || batchOrNot === BatchOrNot.CoinTime) {
    ms = endTimestamp - timestamp;
  } else {
    ms = timestamp - startTimestamp;
  }

  const { days, hours, minutes, seconds } = useGetTime(ms);

  let headline;
  if (batchOrNot === BatchOrNot.SuiSupply) {
    headline = `Mint a Random Bottle for ${
      price / 1000000000
    } $SUI, hurry up there are only ${left} left!`;
  } else if (batchOrNot === BatchOrNot.SuiTime) {
    headline = `Mint a Random Bottle for ${
      price / 1000000000
    } $SUI, hurry up there is only ${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s) left!`;
  } else if (batchOrNot === BatchOrNot.CoinSupply) {
    headline = `Mint a Random Bottle for ${
      priceInCoins / 1000000000
    } $${coin}, hurry up there are only ${left} left!`;
  } else if (batchOrNot === BatchOrNot.CoinTime) {
    headline = `Mint a Random Bottle for ${
      priceInCoins / 1000000000
    } $${coin}, hurry up there is only ${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s) left!`;
  } else if (startTimestamp !== 0) {
    headline = `Next batch opens in ${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} seconds`;
  } else {
    headline =
      'There is no batch open or planned at the moment, join our community to get more options!';
  }

  return status === 'idle' || status === 'loading' ? (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 bg-slate-400 rounded"></div>
        <div className="h-3 bg-slate-400 rounded w-1/5"></div>
      </div>
    </div>
  ) : (
    <div>
      {headline}
      <div className="text-blue-500 text-xl">
        {(batchOrNot === BatchOrNot.SuiSupply || batchOrNot === BatchOrNot.CoinSupply) &&
          `${left} / ${supply} left`}
      </div>
    </div>
  );
};

export default DispenserStatus;
