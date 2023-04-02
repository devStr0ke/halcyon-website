import { useWalletKit } from '@mysten/wallet-kit';
import { DISPENSER, MINT_CAP, MONKEY, PACKAGE_ID } from './config';
import { useUserStore } from '../../store/store';
import { TransactionBlock } from '@mysten/sui.js';

// hook donnant accès à 6 fonctions permettant d'envoyer les 6 tx au sc
// const { buyRandomBottle } = useSendTx;
// onClick={() => buyRandomBottle}

export const useSendTx = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const coinObjectId = useUserStore((state) => state.coinObjectId);
  const wwMonkeyIds = useUserStore((state) => state.wwMonkeyIds);
  const emptyBottleIds = useUserStore((state) => state.emptyBottleIds);
  const filledBottleIds = useUserStore((state) => state.filledBottleIds);
  const magicNumber = useUserStore((state) => state.magicNumber);

  const buyRandomBottle = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottle::buy_random_bottle`,
        typeArguments: [],
        arguments: [tx.object(MINT_CAP), tx.object(DISPENSER), tx.object(coinObjectId)]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const swapMonkey = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottle::buy_random_bottle`,
        typeArguments: [],
        arguments: [tx.object(MINT_CAP), tx.object(DISPENSER), tx.object(coinObjectId)]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const recycle = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottle::buy_random_bottle`,
        typeArguments: [],
        arguments: [tx.object(MINT_CAP), tx.object(DISPENSER), tx.object(coinObjectId)]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const register = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottle::buy_random_bottle`,
        typeArguments: [],
        arguments: [tx.object(MINT_CAP), tx.object(DISPENSER), tx.object(coinObjectId)]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const claimRandomBottle = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottle::buy_random_bottle`,
        typeArguments: [],
        arguments: [tx.object(MINT_CAP), tx.object(DISPENSER), tx.object(coinObjectId)]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const claimFilledBottle = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottle::buy_random_bottle`,
        typeArguments: [],
        arguments: [tx.object(MINT_CAP), tx.object(DISPENSER), tx.object(coinObjectId)]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { buyRandomBottle, swapMonkey, recycle, register, claimRandomBottle, claimFilledBottle };
};
