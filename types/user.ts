import { Status } from './fetching';

export interface Role {
  role: string;
  claimed: boolean;
  enthusiast: boolean;
}

export interface UserObject {
  address: string;
  magicNumber: number;
  testCoinIds: string[];
  testCoinBalance: number;
  suiBalance: number;
  filledBottleIds: string[];
  emptyBottleIds: string[];
  ticketIds: string[];
  roles: Role[];
  isWetlisted: boolean | null;
}

export interface UserStore extends UserObject {
  status: Status;
  setStatus: (_status: Status) => void;
  setUser: (_user: UserObject) => void;
  updateRoleClaimStatus: (_role: string) => void;
  setIsWetlisted: () => void;
  addEmptyBottleId: (_id: string) => void;
  addFilledBottleId: (_id: string) => void;
  removeEmptyBottles: () => void;
  removeFilledBottle: () => void;
  removeVoucher: () => void;
}
