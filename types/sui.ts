/* eslint-disable no-unused-vars */
import { Status } from './fetching';

export interface Nft {
  data: {
    digest: string;
    objectId: string;
    type: string;
    version: string;
  }
}

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
  testCoin: StructTag;
}

export interface DispenserStore extends DispenserObject {
  status: Status;
  setStatus: (_status: Status) => void;
  setDispenser: (_dispenser: DispenserObject) => void;
}

export enum Batch {
  Sui,
  Coin,
  Closed
}

