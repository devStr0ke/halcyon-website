import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { Config } from '../../types/config';

export const testnetConnection = new Connection({
    fullnode: "https://sui-testnet.artifact.systems:443/",
    faucet: "",
});

const net = "testnet";

const provider = new JsonRpcProvider(testnetConnection);

// ---------- Objects IDs ----------

const package_id = "0x963aa152ca6e179565849b3e2267a407cedcae4afab100329a54ab440aecaac9";

const dispenser = "0x94db597bb6a9850acfc01f709d4e09783f91c0661a4ca3eb3d978e5e7afedc60";

export const testnetConfig: Config = { net, provider, package_id, dispenser }