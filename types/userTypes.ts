import { Status } from './dispenserTypes';

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
}

export interface HalcyonProfile {
  id: string;
  id_discord: string;
  sui_adresse: string;
}
