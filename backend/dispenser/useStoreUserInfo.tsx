import { PACKAGE_ID, TEST_ADDRESS, WW_MONKEY, provider } from "./config";
import { useUserStore } from "../../store/store";
import { NftClient, ArtNft } from "@originbyte/js-sdk";
import { BCS, getSuiMoveConfig, BcsWriter } from "@mysten/bcs";

// hook permettant de fetch et store avec Zustand
// toutes les infos liées à l'utilisateur
// pour y accéder:
//
// import { useUserStore } from "./store/store"
// const coinObjectId = useUserStore((state) => state.coinObjectId);

const computeMagicNumber = (addr: string): number => {
    const bcs = new BCS(getSuiMoveConfig());
    let bcsWriter: BcsWriter = bcs.ser(BCS.ADDRESS, addr);
    let bytes: Uint8Array = bcsWriter.toBytes();
    return bytes[18] * bytes[19]
}

const getNftsForAddress = async (addr: string): Promise<ArtNft[]> => {
    const client = new NftClient();
    const nfts = await client.getNftsForAddress(addr);
    console.log("nfts", nfts);
    return nfts
};

const filterFilledIds = async (nfts: ArtNft[]): Promise<string[]> => {
    const filtered = nfts.filter(nft => {
        if (nft.collectionPackageObjectId == PACKAGE_ID && nft.name == "Filled Bottle") {
            return nft
        }
    })
    const mapped = filtered.map(nft => nft.id)
    return mapped
}

const filterEmptyIds = async (nfts: ArtNft[]): Promise<string[]> => {
    const filtered = nfts.filter(nft => {
        if (nft.collectionPackageObjectId == PACKAGE_ID && nft.name == "Empty Bottle") {
            return nft
        }
    })
    const mapped = filtered.map(nft => nft.id)
    return mapped
}

const filterMonkeyIds = async (nfts: ArtNft[]): Promise<string[]> => {
    const filtered = nfts.filter(nft => {
        if (nft.collectionPackageObjectId == WW_MONKEY && nft.name == "Wetlist Monkey") {
            return nft
        }
    })
    const mapped = filtered.map(nft => nft.id)
    return mapped
}

const getSuiCoin = async (addr: string): Promise<string> => {
    const coins = await provider.getCoins(addr);
    let coinId = "";
    for (const coin of coins.data) {
        if (coin.balance > 10000000) { coinId = coin.coinObjectId }
        // TODO: if no coin has good balance, and so coinId = "", send alert go claim faucet
    }
    return coinId
}

const useStoreUserInfo = async (address: string) => {
    const setUser = useUserStore(state => state.setUser);
    
    const magicNumber = computeMagicNumber(address);
    const coinObjectId = await getSuiCoin(address);
    
    const nfts = await getNftsForAddress(address);
    const filledBottleIds = await filterFilledIds(nfts);
    const emptyBottleIds = await filterEmptyIds(nfts);
    const wwMonkeyIds = await filterMonkeyIds(nfts);

    setUser({
        address,
        magicNumber,
        coinObjectId,
        filledBottleIds,
        emptyBottleIds,
        wwMonkeyIds,
    });
}

export default useStoreUserInfo;