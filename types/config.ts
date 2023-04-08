import { JsonRpcProvider } from "@mysten/sui.js";

export interface Config {
    net: "devnet" | "testnet",
    provider: JsonRpcProvider,
    package_id: string,
    dispenser: string,
}

export interface ConfigStore extends Config {
    setConfig: (_config: Config) => void
}