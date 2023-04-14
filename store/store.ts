import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { DispenserObject, DispenserStore } from '../types/sui';
import { UserObject, UserStore, ModalStore } from '../types/user';
import { Config, ConfigStore } from '../types/config';
import { Status } from '../types/fetching';
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

export const useModalStore = create<ModalStore>((set) => ({
  modelContent: '',
  isModalOpened: false,
  isBottleFilled: null,
  setShowModal: (isModalOpened: boolean) =>
    set({
      isModalOpened
    }),
  setModalContent: (modelContent: string) =>
    set({
      modelContent
    }),
  setIsBottleFilled: (isBottleFilled: boolean | null) =>
    set({
      isBottleFilled
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
  reduceSupply: () => set((state) => ({
    left: state.left - 1,
  })),
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

export const useUserStore = create<UserStore>((set) => ({
  status: 'idle',
  address: '',
  magicNumber: 0,
  testCoinIds: [],
  testCoinBalance: 0,
  suiBalance: 0,
  filledBottleIds: [],
  emptyBottleIds: [],
  ticketIds: [],
  roles: [],
  isWetlisted: null,
  setStatus: (status: Status) =>
    set({
      status
    }),
  setUser: (user: UserObject) =>
    set({
      status: 'succeeded',
      address: user.address,
      magicNumber: user.magicNumber,
      testCoinIds: user.testCoinIds,
      testCoinBalance: user.testCoinBalance,
      suiBalance: user.suiBalance,
      filledBottleIds: user.filledBottleIds,
      emptyBottleIds: user.emptyBottleIds,
      ticketIds: user.ticketIds,
      roles: user.roles,
      isWetlisted: user.isWetlisted
    }),
  updateRoleClaimStatus: (role: string) => {
    set((state) => {
      const roleIndex = state.roles.findIndex((r) => r.role === role);

      if (roleIndex === -1) {
        console.error('Role not found');
        return {};
      }

      const updatedRoles = state.roles.map((role, idx) =>
        idx === roleIndex ? { ...role, claimed: true } : role
      );

      return { roles: updatedRoles };
    });
  },
  setIsWetlisted: () => {
    set({
      isWetlisted: true
    });
  },
  addEmptyBottleId: (id: string) => {
    set((state) => ({
    ...state,
    emptyBottleIds: [...state.emptyBottleIds, id],
  }))},
  addFilledBottleId: (id: string) => set((state) => ({
    ...state,
    filledBottleIds: [...state.filledBottleIds, id],
  })),
  removeBottles: () => set((state) => ({
    ...state,
    emptyBottleIds: state.emptyBottleIds.slice(5),
  })),
  shallow
}));
