import { provider, DISPENSER, COLLECTION, MONKEY, MINT_CAP } from "./config";

export const getDispenserInfo = async () => {
    const tx = await provider.getObjectBatch([
        DISPENSER,
        MONKEY,
        COLLECTION,
        MINT_CAP
    ]);
    console.log("tx", tx);
    // TODO: parse info and store in state
}