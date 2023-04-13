import { useEffect, useState } from 'react';
import { BatchOrNot, DispenserStore } from '../../types/sui';
import { UserStore } from '../../types/user';

export const msToDayHourMinSec = (timestamp: number) => {
  // Calculate days, hours, minutes, and seconds
  const cSeconds = Math.floor(timestamp / 1000);
  const cMinutes = Math.floor(cSeconds / 60);
  const cHours = Math.floor(cMinutes / 60);
  const days = Math.floor(cHours / 24);
  // Calculate remaining hours, minutes, and seconds
  const hours = cHours % 24 < 10 ? '0' + (cHours % 24) : cHours % 24;
  const minutes = cMinutes % 60 < 10 ? '0' + (cMinutes % 60) : cMinutes % 60;
  const seconds = cSeconds % 60 < 10 ? '0' + (cSeconds % 60) : cSeconds % 60;

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
