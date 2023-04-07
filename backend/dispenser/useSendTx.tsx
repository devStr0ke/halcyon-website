import { useWalletKit } from '@mysten/wallet-kit';
import { DISPENSER, PACKAGE_ID } from './config';
import { useUserStore, useDispenserStore } from '../../store/store';
import { TransactionBlock } from '@mysten/sui.js';

// hook donnant accès à 6 fonctions permettant d'envoyer les 6 tx au sc
// const { buyRandomBottle } = useSendTx;
// onClick={() => buyRandomBottle}

export const useSendTx = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  const { testCoinIds, ticketIds, emptyBottleIds, filledBottleIds, magicNumber } = useUserStore(
    (state) => state
  );
  const { testCoin, testNft } = useDispenserStore((state) => state);

  const buyRandomBottle = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottles::buy_random_bottle`,
        typeArguments: [],
        arguments: [
          tx.object(DISPENSER),
          tx.gas,
          tx.object('0x0000000000000000000000000000000000000000000000000000000000000006')
        ]
      });

      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert',
        chain: 'sui:sui'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const buyRandomBottleWithCoins = async () => {
    try {
      const tx = new TransactionBlock();
      let toMerge = [];
      let i = 1;
      while (i < testCoinIds.length) {
        toMerge.push(tx.object(testCoinIds[i]));
        i++;
      }

      tx.mergeCoins(tx.object(testCoinIds[0]), toMerge);
      tx.moveCall({
        target: `${PACKAGE_ID}::bottles::buy_random_bottle_with_coins`,
        typeArguments: [`0x${testCoin.generics}`],
        arguments: [
          tx.object(DISPENSER),
          tx.object(testCoinIds[0]),
          tx.object('0x0000000000000000000000000000000000000000000000000000000000000006')
        ]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert',
        chain: 'sui:sui'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const swapNft = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottles::swap_nft`,
        typeArguments: [`0x${testNft.generics}`],
        arguments: [tx.object(DISPENSER), tx.object(ticketIds[0])]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert',
        chain: 'sui:sui'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const recycle = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottles::recycle`,
        typeArguments: [],
        arguments: [
          tx.object(DISPENSER),
          tx.pure(emptyBottleIds[0]),
          tx.pure(emptyBottleIds[1]),
          tx.pure(emptyBottleIds[2]),
          tx.pure(emptyBottleIds[3]),
          tx.pure(emptyBottleIds[4])
        ]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert',
        chain: 'sui:sui'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const register = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottles::register_wetlist`,
        typeArguments: [],
        arguments: [tx.object(filledBottleIds[0])]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert',
        chain: 'sui:sui'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const claimRandomBottle = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottles::claim_random_bottle`,
        typeArguments: [],
        arguments: [tx.object(DISPENSER), tx.pure(magicNumber)]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert',
        chain: 'sui:sui'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const claimFilledBottle = async () => {
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${PACKAGE_ID}::bottles::claim_filled_bottle`,
        typeArguments: [],
        arguments: [tx.object(DISPENSER), tx.pure(magicNumber)]
      });

      tx.setGasBudget(10000);
      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: 'WaitForEffectsCert',
        chain: 'sui:sui'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    buyRandomBottle,
    buyRandomBottleWithCoins,
    swapNft,
    recycle,
    register,
    claimRandomBottle,
    claimFilledBottle
  };
};
