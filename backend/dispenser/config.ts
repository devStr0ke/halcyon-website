import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';

export const provider = new JsonRpcProvider(devnetConnection);

// ---------- Objects IDs ----------

export const PACKAGE_ID = "0x5c62d45df7f770cb370aec4791f9afe7264362b8ec30f0dd917c1c18e7b693cd";

export const ADMIN_CAP = "0x751d07ba64d2212862534ed0746a97203fc939aecf39ab146e386831c2ca4ecf";

export const DISPENSER = "0xb86e25af4d4319555e4c1f431b2b7d13faa8d8e9b2d1771ee1c87684c0607a0b";

export const COLLECTION = "0xea2804d63938837864506962e3b66ee66c9bacba803cf73a8fd500f4d0ecce5c"

export const TEST_COIN_TYPE = "0x194baba05589e135f9e35e65e360655deb2502695158e0c31bb5eecd2d53f0e7::test_coin::TEST_COIN"

export const TEST_NFT_COLLECTION = "0xea2804d63938837864506962e3b66ee66c9bacba803cf73a8fd500f4d0ecce5c"