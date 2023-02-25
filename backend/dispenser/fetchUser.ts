import { COLLECTION, TEST_COLLECTION, provider } from "./config";
import { NftClient } from "@originbyte/js-sdk";

export const getNftsForAddress = async (addr: string) => {
    const client = new NftClient();
    const collections = await client.getCollectionsById({
        objectIds: [COLLECTION, TEST_COLLECTION],
    }); // not sure what it returns
    const nfts = await client.getNftsForAddress(addr);
    console.log("nfts", collections, nfts);
    // TODO: filter nfts with collections and set status in state
};

export const getSuiCoins = async (addr: string) => {
    const coins = await provider.getCoins(
        addr,
        // "0x2::sui::SUI", if not specified default to SUI
    );
    console.log("coins: ", coins);
    // TODO: check wich coin object has the required amount and store its id in state
}