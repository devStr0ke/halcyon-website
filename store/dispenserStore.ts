import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { DispenserObject, DispenserStore, Config, ConfigStore, Status } from '../types/dispenserTypes';
import { testnetConfig } from '../backend/dispenser/config.testnet';

export const useConfigStore = create<ConfigStore>((set) => ({
  net: testnetConfig.net,
  provider: testnetConfig.provider,
  package_id: testnetConfig.package_id,
  dispenser: testnetConfig.dispenser,
  setConfig: (config: Config) =>
    set({
      net: config.net,
      provider: config.provider,
      package_id: config.package_id,
      dispenser: config.dispenser
    })
}));

export const useDispenserStore = create<DispenserStore>((set) => ({
  status: 'idle',
  active: false,
  startTimestamp: 0,
  endTimestamp: 0,
  price: 0,
  priceInCoins: 0,
  balance: 0,
  supply: 0,
  left: 0,
  testNft: {
    packageId: '',
    moduleName: '',
    structName: '',
    generics: ''
  },
  testCoin: {
    packageId: '',
    moduleName: '',
    structName: '',
    generics: ''
  },
  setStatus: (status: Status) => set({
    status
  }),
  setDispenser: (dispenser: DispenserObject) =>
    set({
      status: 'succeeded',
      active: dispenser.active,
      startTimestamp: Number(dispenser.startTimestamp),
      endTimestamp: Number(dispenser.endTimestamp),
      price: Number(dispenser.price),
      priceInCoins: Number(dispenser.priceInCoins),
      balance: Number(dispenser.balance),
      supply: Number(dispenser.supply),
      left: Number(dispenser.left),
      testNft: dispenser.testNft,
      testCoin: dispenser.testCoin,
    }),
  shallow
}));