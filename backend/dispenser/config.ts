import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';

export const provider = new JsonRpcProvider(devnetConnection);

// ---------- Objects IDs ----------

export const PACKAGE_ID = '0x16e6bb0ff7bc0b2c3b4aa58902e1b37a08e6a4ef';

export const MINT_CAP = '0x1d0c63b915299e2f39dfba90251dbd7abb55a4d0';

export const ADMIN_CAP = '0x561f218f0cf3aa3187477646839058d65eb621bf';

export const DISPENSER = '0x5819e47c759f775b2d44bab98e826b8771e35560';

export const MONKEY = '0x4ab290fa5b08d5a3400f08aa7e0127aa4f358eae';

export const COLLECTION = '0x93221dbb1bb8f7d41a56122da8dd2ccdc590a252';

// id of the package which issued the collection of ww monkeys
export const WW_MONKEY = '0x93221dbb1bb8f7d41a56122da8dd2ccdc590a252';

export const TEST_ADDRESS = '0x09e26bc2ba60b37e6f06f3961a919da18feb5a2b';
