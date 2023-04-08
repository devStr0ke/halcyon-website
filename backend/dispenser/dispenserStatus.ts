import { useEffect, useState } from 'react';
import { BatchOrNot, DispenserStore } from '../../types/suiDispenser';
import { UserStore } from '../../types/suiUser';

export const useGetTime = (timestamp: number) => {
  const { days, hours, minutes, seconds } = msToDayHourMinSec(timestamp);

  const [date, setDate] = useState({
    total: timestamp,
    days,
    hours,
    minutes,
    seconds
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate((prevDate) => {
        const { days, hours, minutes, seconds } = msToDayHourMinSec(prevDate.total - 1);

        return {
          total: prevDate.total - 1000,
          days,
          hours,
          minutes,
          seconds
        };
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return date;
};

export const msToDayHourMinSec = (timestamp: number) => {
  // Calculate days, hours, minutes, and seconds
  const cSeconds = Math.floor(timestamp / 1000);
  const cMinutes = Math.floor(cSeconds / 60);
  const cHours = Math.floor(cMinutes / 60);
  const days = Math.floor(cHours / 24);
  // Calculate remaining hours, minutes, and seconds
  const hours = cHours % 24;
  const minutes = cMinutes % 60;
  const seconds = cSeconds % 60;

  return { days, hours, minutes, seconds };
};

const current_timestamp = new Date().getTime();

export const getBatchOrNot = (dispenser: DispenserStore, user: UserStore): BatchOrNot => {
  if (
    dispenser.active &&
    dispenser.supply > 0 &&
    dispenser.left > 0 &&
    dispenser.startTimestamp < current_timestamp &&
    dispenser.endTimestamp < 100000000000000 &&
    dispenser.supply === 100000000000000 &&
    dispenser.priceInCoins === 100000000000000 &&
    dispenser.price < 100000000000000
  ) {
    return BatchOrNot.SuiTime;
  } else if (
    dispenser.active &&
    dispenser.supply > 0 &&
    dispenser.left > 0 &&
    dispenser.startTimestamp < current_timestamp &&
    dispenser.endTimestamp === 100000000000000 &&
    dispenser.supply < 100000000000000 &&
    dispenser.priceInCoins === 100000000000000 &&
    dispenser.price < 100000000000000
  ) {
    return BatchOrNot.SuiSupply;
  } else if (
    dispenser.active &&
    dispenser.supply > 0 &&
    dispenser.left > 0 &&
    dispenser.startTimestamp < current_timestamp &&
    dispenser.endTimestamp < 100000000000000 &&
    dispenser.supply === 100000000000000 &&
    dispenser.priceInCoins < 100000000000000 &&
    dispenser.price === 100000000000000 &&
    user.testCoinIds.length > 0
  ) {
    return BatchOrNot.CoinTime;
  } else if (
    dispenser.active &&
    dispenser.supply > 0 &&
    dispenser.left > 0 &&
    dispenser.startTimestamp < current_timestamp &&
    dispenser.endTimestamp === 100000000000000 &&
    dispenser.supply < 100000000000000 &&
    dispenser.priceInCoins < 100000000000000 &&
    dispenser.price === 100000000000000 &&
    user.testCoinIds.length > 0
  ) {
    return BatchOrNot.CoinSupply;
  } else {
    return BatchOrNot.Closed;
  }
};
