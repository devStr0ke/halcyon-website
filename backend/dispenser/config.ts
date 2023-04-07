import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';

// export const devnetConnection = new Connection({
//     fullnode: "https://sui-devnet.artifact.systems:443/",
//     faucet: "",
// });

export const provider = new JsonRpcProvider(devnetConnection);

// ---------- Objects IDs ----------

export const PACKAGE_ID = "0x963aa152ca6e179565849b3e2267a407cedcae4afab100329a54ab440aecaac9";

export const ADMIN_CAP = "0xae0592db8aaa72cfac4e7687b3f9f11ec214d8d3cdf37516568d3fe57daacec6";

export const DISPENSER = "0x94db597bb6a9850acfc01f709d4e09783f91c0661a4ca3eb3d978e5e7afedc60";

export const COLLECTION = "0x27150120370befb9851d54813576bcce0ff7b637efc4e603ba9f10ff1d434f50";

export const TEST_COIN_TYPE = "0x194baba05589e135f9e35e65e360655deb2502695158e0c31bb5eecd2d53f0e7::test_coin::TEST_COIN"
