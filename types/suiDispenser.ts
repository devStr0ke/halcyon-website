export interface DispenserObject {
    active: boolean,
    balance: string
    id: any
    left: string
    price: string
    supply: string
}

export interface DispenserStore {
    active: boolean,
    price: number,
    balance: number,
    supply: number,
    left: number,
    setDispenser: (_dispenser: DispenserObject) => void
}

export interface MonkeyObject {
    id: any,
    nft_module: string,
    nft_name: string,
    nft_package: string,
    nft_type: string,
}

export interface MonkeyStore {
    nft_package: string,
    nft_module: string,
    nft_type: string,
    nft_name: string,
    setMonkey: (_dispenser: MonkeyObject) => void
}