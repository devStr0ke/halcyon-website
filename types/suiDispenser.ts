export interface StructTag {
    packageId: string,
    moduleName: string,
    structName: string,
    generics: string,
}

export interface DispenserObject {
    active: boolean,
    startTimestamp: number,
    endTimestamp: number,
    price: number,
    priceInCoins: number,
    balance: number,
    supply: number,
    left: number,
    testNft: StructTag,
    testNftName: string,
    testCoin: StructTag,
    mintCap: string,
}

export interface DispenserStore extends DispenserObject {
    loading: boolean,
    setLoading: (_loading: boolean) => void
    setDispenser: (_dispenser: DispenserObject) => void
}

export enum BatchOrNot {
    SuiTime,
    SuiSupply,
    CoinTime,
    CoinSupply,
    Closed,
}