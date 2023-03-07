import { useWalletKit } from "@mysten/wallet-kit";
import { DISPENSER, MINT_CAP, MONKEY, PACKAGE_ID } from "./config";
import { useUserStore } from "../../store/store"

// hook donnant accès à 6 fonctions permettant d'envoyer les 6 tx au sc
// const { buyRandomBottle } = useSendTx;
// onClick={() => buyRandomBottle}

export const useSendTx = () => {
    const { signAndExecuteTransaction } = useWalletKit();

    const coinObjectId = useUserStore((state) => state.coinObjectId);
    const wwMonkeyIds = useUserStore((state) => state.wwMonkeyIds);
    const emptyBottleIds = useUserStore((state) => state.emptyBottleIds);
    const filledBottleIds = useUserStore((state) => state.filledBottleIds);
    const magicNumber = useUserStore((state) => state.magicNumber);
    
    const buyRandomBottle = async () => {
        try {
            await signAndExecuteTransaction({
                kind: "moveCall",
                data: {
                    packageObjectId: PACKAGE_ID,
                    module: "bottle",
                    function: "buy_random_bottle",
                    typeArguments: [],
                    arguments: [
                        MINT_CAP,
                        DISPENSER,
                        coinObjectId,
                    ],
                    gasBudget: 100000,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const swapMonkey = async () => {
        try {
            await signAndExecuteTransaction({
                kind: "moveCall",
                data: {
                    packageObjectId: PACKAGE_ID,
                    module: "bottle",
                    function: "swap_monkey",
                    typeArguments: [],
                    arguments: [
                        MINT_CAP,
                        MONKEY,
                        wwMonkeyIds[0],
                    ],
                    gasBudget: 100000,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const recycle = async () => {
        try {
            await signAndExecuteTransaction({
                kind: "moveCall",
                data: {
                    packageObjectId: PACKAGE_ID,
                    module: "bottle",
                    function: "recycle",
                    typeArguments: [],
                    arguments: [
                        MINT_CAP,
                        emptyBottleIds[0],
                        emptyBottleIds[1],
                        emptyBottleIds[2],
                        emptyBottleIds[3],
                        emptyBottleIds[4],
                    ],
                    gasBudget: 100000,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const register = async () => {
        try {
            await signAndExecuteTransaction({
                kind: "moveCall",
                data: {
                packageObjectId: PACKAGE_ID,
                    module: "bottle",
                    function: "register",
                    typeArguments: [],
                    arguments: [
                        filledBottleIds[0]
                    ],
                    gasBudget: 100000,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const claimRandomBottle = async () => {
        try {
            await signAndExecuteTransaction({
                kind: "moveCall",
                data: {
                    packageObjectId: PACKAGE_ID,
                    module: "bottle",
                    function: "claim_random_bottle",
                    typeArguments: [],
                    arguments: [
                        MINT_CAP,
                        magicNumber,
                    ],
                    gasBudget: 100000,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const claimFilledBottle = async () => {
        try {
            await signAndExecuteTransaction({
                kind: "moveCall",
                data: {
                    packageObjectId: PACKAGE_ID,
                    module: "bottle",
                    function: "claim_filled_bottle",
                    typeArguments: [],
                    arguments: [
                        MINT_CAP,
                        magicNumber,
                    ],
                    gasBudget: 100000,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    return { buyRandomBottle, swapMonkey, recycle, register, claimRandomBottle, claimFilledBottle }
}
