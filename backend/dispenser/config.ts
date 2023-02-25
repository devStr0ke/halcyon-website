import { JsonRpcProvider, Network } from '@mysten/sui.js';

export const provider = new JsonRpcProvider(Network.DEVNET);

// ---------- Objects IDs ----------

export const PACKAGE_ID = "0x32b7adf6d37109671ca391afb9657b4d3c89101c";

export const MINT_CAP = "0xb6fab7b6bfa12e655ffe931c584d2a37db586236";

export const ADMIN_CAP = "0x63691f90195b1a7010bfd24b4a4780519c601b6e";

export const DISPENSER = "0xb588d3e462ce562ff59d3bdcc3933152b15c1717";

export const MONKEY = "0x10c7fc80c534962171cf93221f306a448e0b393f";

export const COLLECTION = "0x437a75ca596575af35911dd4bedd8a578e97b1c4";

export const TEST_COLLECTION = "0x437a75ca596575af35911dd4bedd8a578e97b1c4";