import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { Config } from '../../types/config';

export const testnetConnection = new Connection({
    fullnode: "https://sui-testnet.nodeinfra.com/",
    faucet: "",
});

const net = "testnet";

const provider = new JsonRpcProvider(testnetConnection);

// ---------- Objects IDs ----------

const package_id = "0x64238cbcc0508e6a74ed679a766912bbff9f56114bedd789230b63ba0ead3cb0";

const dispenser = "0xbae715f1d6dc6c1c1307162a3057c885dab9e29e7cc08a6e9e8095fd737a6c75";

export const testnetConfig: Config = { net, provider, package_id, dispenser }