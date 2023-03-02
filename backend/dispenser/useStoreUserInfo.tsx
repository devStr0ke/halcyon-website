import { COLLECTION, provider } from "./config";
import { useUserStore } from "../../store/store";
import { NftClient } from "@originbyte/js-sdk";

export const getNftsForAddress = async (addr: string) => {
    const client = new NftClient();
    const nfts = await client.getNftsForAddress(addr);
    console.log("nfts", nfts);
};

const getSuiCoin = async (addr: string) => {
    const coins = await provider.getCoins(addr);
    let coinId = "";
    for (const coin of coins.data) {
        if (coin.balance > 10000000) { coinId = coin.coinObjectId }
        // TODO: if no coin has good balance, send alert go claim faucet
    }
    return coinId
}

const useStoreUserInfo = async (address: string) => {
    const setUser = useUserStore(state => state.setUser);
    
    const nfts = await getNftsForAddress(address);
    const magicNumber = 0;
    const coinObjectId = await getSuiCoin(address);
    
    setUser({
        address,
        magicNumber,
        coinObjectId,
        filledBottleIds: [],
        emptyBottleIds: [],
        wwMonkeyIds: [],
    });
}

export default useStoreUserInfo;