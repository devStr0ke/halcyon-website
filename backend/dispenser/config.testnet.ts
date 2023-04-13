import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { Config } from '../../types/config';

export const testnetConnection = new Connection({
    fullnode: "https://sui-testnet.nodeinfra.com/",
    faucet: "",
});

const net = "testnet";

const provider = new JsonRpcProvider(testnetConnection);

// ---------- Objects IDs ----------

const package_id = "0x733ec22595c116fc9cdb4d1a9073ac10c10fd7d366dc7359906c3c1527abdda7";

const dispenser = "0xde11121d99da40e18398c4f20d2ad3b7da2c82316663e361be5ca296c861b0cf";

export const testnetConfig: Config = { net, provider, package_id, dispenser }