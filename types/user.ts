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
  addBottle: (_bottle: { id: string; is_filled: boolean }) => void;
}

export interface ModalStore {
  modelContent: string;
  isModalOpened: boolean;
  isBottleFilled: null | boolean;
  setShowModal: (_isModalOpened: boolean) => void;
  setModalContent: (_content: string) => void;
  setIsBottleFilled: (_isBottleFilled: null | boolean) => void;
}