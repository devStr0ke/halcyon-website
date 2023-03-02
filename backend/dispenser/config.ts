import { JsonRpcProvider, Network } from '@mysten/sui.js';

export const provider = new JsonRpcProvider(Network.DEVNET);

// ---------- Objects IDs ----------

export const PACKAGE_ID = "0x6275c283bb61211f67d5e827b57a3649d388465a";

export const MINT_CAP = "0x90f5a5e06aa7aef0f197d1e84ea0c76eaf5131ca";

export const ADMIN_CAP = "0x03a72c0f6be72f2f7bb3b174d0f83687c6a4c5d8";

export const DISPENSER = "0x76db7bbe93f0d9c2cdd264f4537d8dd8b43aebef";

export const MONKEY = "0x8940214174c916a423069dc9855f2acd380712c9";

export const COLLECTION = "0x3317a107c7f5f35fb4acdc2914c077158c8b12a7";

export const TEST_COLLECTION = "0x3317a107c7f5f35fb4acdc2914c077158c8b12a7";

export const TEST_ADDRESS = "0x09e26bc2ba60b37e6f06f3961a919da18feb5a2b";