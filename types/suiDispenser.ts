/* eslint-disable no-unused-vars */
import { Status } from './fetching';

export interface StructTag {
  packageId: string;
  moduleName: string;
  structName: string;
  generics: string;
}

export interface DispenserObject {
  active: boolean;
  startTimestamp: number;
  endTimestamp: number;
  price: number;
  priceInCoins: number;
  balance: number;
  supply: number;
  left: number;
  testNft: StructTag;
  testNftName: string;
  testCoin: StructTag;
  mintCap: string;
}

export interface DispenserStore extends DispenserObject {
  status: Status;
  setStatus: (_status: Status) => void;
  setDispenser: (_dispenser: DispenserObject) => void;
}

export enum BatchOrNot {
  SuiTime,
  SuiSupply,
  CoinTime,
  CoinSupply,
  Closed
}

export interface ModalStore {
  modelContent: string;
  isModalOpened: boolean;
  isBottleFilled: null | boolean;
  setShowModal: (_isModalOpened: boolean) => void;
  setModalContent: (_content: string) => void;
  setIsBottleFilled: (_isBottleFilled: null | boolean) => void;
}
