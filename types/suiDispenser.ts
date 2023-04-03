export interface TestNft {
    packageId: string,
    moduleName: string,
    structName: string,
    generics: string,
}

export interface TestCoin {
    packageId: string,
    moduleName: string,
    structName: string,
    generics: string,
}

export interface DispenserObject {
    id: string,
    active: boolean,
    startTimestamp: number,
    endTimestamp: number,
    price: number,
    priceInCoins: number,
    balance: number,
    supply: number,
    left: number,
    testNft: TestNft,
    testNftName: string,
    testCoin: TestCoin,
    mintCap: string,
}

export interface DispenserStore extends DispenserObject {
    setDispenser: (_dispenser: DispenserObject) => void
}