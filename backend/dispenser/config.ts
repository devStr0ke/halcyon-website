import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';

export const provider = new JsonRpcProvider(devnetConnection);

// ---------- Objects IDs ----------

export const PACKAGE_ID = "0xed54aeff9921b073f4036e9015b8913cc0f6235fca9ab20be92217901ac511c4";

export const ADMIN_CAP = "0xbaf0b55855fe60e3aebc823a02f5cbc5a93ba0ea6bb6b7d2ad3f4d6c7f885828";

export const DISPENSER = "0x882b9ffe1a1315a112621596d35dc7de8b54f8ecc63bf25cdf65c6d4d4bd3fd4";

export const COLLECTION = "0xfbdc3d8c86f57d8d29dc594fc1835076e93f0d1b6829455c6bd4aab119c33f13"

export const TEST_COIN_TYPE = "0x194baba05589e135f9e35e65e360655deb2502695158e0c31bb5eecd2d53f0e7::test_coin::TEST_COIN"

export const TEST_NFT_COLLECTION = "0xfbdc3d8c86f57d8d29dc594fc1835076e93f0d1b6829455c6bd4aab119c33f13"