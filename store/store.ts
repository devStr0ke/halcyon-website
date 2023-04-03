import { create } from 'zustand'
import { shallow } from 'zustand/shallow';
import { DispenserObject, DispenserStore } from '../types/suiDispenser'
import { UserObject, UserStore } from '../types/suiUser';

export const useDispenserStore = create<DispenserStore>((set) => ({
    id: "",
    active: false,
    startTimestamp: 0,
    endTimestamp: 0,
    price: 0,
    priceInCoins: 0,
    balance: 0,
    supply: 0,
    left: 0,
    testNft: {
        packageId: "",
        moduleName: "",
        structName: "",
        generics: "",
    },
    testNftName: "",
    testCoin: {
        packageId: "",
        moduleName: "",
        structName: "",
        generics: "",
    },
    mintCap: "",
    setDispenser: (dispenser: DispenserObject) => set({
        id: dispenser.id,
        active: dispenser.active,
        startTimestamp: Number(dispenser.startTimestamp),
        endTimestamp: Number(dispenser.endTimestamp),
        price: Number(dispenser.price),
        priceInCoins: Number(dispenser.priceInCoins),
        balance: Number(dispenser.balance),
        supply: Number(dispenser.supply),
        left: Number(dispenser.left),
        testNft: dispenser.testNft,
        testNftName: dispenser.testNftName,
        testCoin: dispenser.testCoin,
        mintCap: dispenser.mintCap,
    }),
    shallow
}))

export const useUserStore = create<UserStore>((set) => ({
    address: "",
    magicNumber: 0,
    testCoinIds: [],
    filledBottleIds: [],
    emptyBottleIds: [],
    ticketIds: [],
    setUser: (user: UserObject) => set({
        address: user.address,
        magicNumber: user.magicNumber,
        testCoinIds: user.testCoinIds,
        filledBottleIds: user.filledBottleIds,
        emptyBottleIds: user.emptyBottleIds,
        ticketIds: user.ticketIds,
    }),
    shallow
}))