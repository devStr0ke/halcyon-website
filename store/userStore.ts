import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { UserObject, UserStore } from '../types/userTypes';
import { Status } from '../types/dispenserTypes';

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
  shallow
}));
