import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { Config } from '../../types/config';

export const testnetConnection = new Connection({
    fullnode: "https://sui-testnet.nodeinfra.com/",
    faucet: "",
});

const net = "testnet";

const provider = new JsonRpcProvider(testnetConnection);

// ---------- Objects IDs ----------

const package_id = "0x159912b608b23e4286e3f787b5bd7ba150764fa7aa1128140b1c4e5b407b1a3c";

const dispenser = "0xf5392fb4dad7cba85f8dcafb6d0a8705b7d66e677f60f51c10a5721d4b791241";

export const testnetConfig: Config = { net, provider, package_id, dispenser }