import { useWalletKit } from "@mysten/wallet-kit";
import { DISPENSER, MINT_CAP, MONKEY, PACKAGE_ID } from "./config";

// hook donnant accès à 6 fonctions permettant d'envoyer les 6 tx au sc
// const { buyRandomBottle } = useSendTx;
// onClick={() => buyRandomBottle}

export const useSendTx = () => {
    const { signAndExecuteTransaction } = useWalletKit();

    const buyRandomBottle = async () => {
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
                    // coin object id from Zustand state,
                ],
                gasBudget: 10000,
            },
        });
    }

    const swapMonkey = async () => {
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
                    // ww monkey id from Zustand state,
                ],
                gasBudget: 10000,
            },
        });
    }

    const recycle = async () => {
        await signAndExecuteTransaction({
            kind: "moveCall",
            data: {
                packageObjectId: PACKAGE_ID,
                module: "bottle",
                function: "recycle",
                typeArguments: [],
                arguments: [
                    MINT_CAP,
                    // empty bottle id from Zustand state,
                    // empty bottle id from Zustand state,
                    // empty bottle id from Zustand state,
                    // empty bottle id from Zustand state,
                    // empty bottle id from Zustand state,
                ],
                gasBudget: 10000,
            },
        });
    }

    const register = async () => {
        await signAndExecuteTransaction({
            kind: "moveCall",
            data: {
            packageObjectId: PACKAGE_ID,
                module: "bottle",
                function: "register",
                typeArguments: [],
                arguments: [
                    // filled bottle id from Zustand state,
                ],
                gasBudget: 10000,
            },
        });
    }

    const claimRandomBottle = async () => {
        await signAndExecuteTransaction({
            kind: "moveCall",
            data: {
                packageObjectId: PACKAGE_ID,
                module: "bottle",
                function: "claim_random_bottle",
                typeArguments: [],
                arguments: [
                    MINT_CAP,
                    // magic number from Zustand state,
                ],
                gasBudget: 10000,
            },
        });
    }

    const claimFilledBottle = async () => {
        await signAndExecuteTransaction({
            kind: "moveCall",
            data: {
                packageObjectId: PACKAGE_ID,
                module: "bottle",
                function: "claim_filled_bottle",
                typeArguments: [],
                arguments: [
                    MINT_CAP,
                    // magic number from Zustand state,
                ],
                gasBudget: 10000,
            },
        });
    }

    return { buyRandomBottle, swapMonkey, recycle, register, claimRandomBottle, claimFilledBottle }
}
