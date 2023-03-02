import { create } from 'zustand'
import { shallow } from 'zustand/shallow';
import { DispenserObject, DispenserStore, MonkeyObject, MonkeyStore } from '../types/suiDispenser'
import { UserObject, UserStore } from '../types/suiUser';

export const useDispenserStore = create<DispenserStore>((set) => ({
    active: false,
    price: 0,
    supply: 0,
    balance: 0,
    left: 0,
    setDispenser: (dispenser: DispenserObject) => set({
        active: dispenser.active,
        price: Number(dispenser.price),
        supply: Number(dispenser.supply),
        balance: Number(dispenser.balance),
        left: Number(dispenser.left),
    }),
    shallow
}))

export const useMonkeyStore = create<MonkeyStore>((set) => ({
    nft_package: "",
    nft_module: "",
    nft_type: "",
    nft_name: "",
    setMonkey: (monkey: MonkeyObject) => set({
        nft_package: monkey.nft_package,
        nft_module: monkey.nft_module,
        nft_type: monkey.nft_type,
        nft_name: monkey.nft_name,
    }),
    shallow
}))

export const useUserStore = create<UserStore>((set) => ({
    address: "",
    magicNumber: 0,
    coinObjectId: "",
    filledBottleIds: [],
    emptyBottleIds: [],
    wwMonkeyIds: [],
    setUser: (user: UserObject) => set({
        address: user.address,
        magicNumber: user.magicNumber,
        coinObjectId: user.coinObjectId,
        filledBottleIds: user.filledBottleIds,
        emptyBottleIds: user.emptyBottleIds,
        wwMonkeyIds: user.wwMonkeyIds,
    }),
    shallow
}))