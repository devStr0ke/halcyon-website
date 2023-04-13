import { useUserStore, useDispenserStore, useConfigStore } from '../../store/store';
import { useSendTx } from '../../backend/dispenser/useSendTx';
import { Batch, DispenserStore } from '../../types/sui';
import { getBatchOrNot } from '../../backend/dispenser/dispenserStatus';
import { useHandleResult } from '../../backend/dispenser/useHandleResult';
import { useEffect, useMemo } from 'react';
import UserStatus from '../UserStatus/UserStatus';
import useAuth from '../../hooks/useAuth';
import { useWalletKit } from '@mysten/wallet-kit';
import { createHalcyonProfile, doesRowExist } from '../../utils/supabase';

const DispenserDrawing = () => {
  const { session } = useAuth();
  const { currentAccount } = useWalletKit();
  const config = useConfigStore((state) => state);
  const user = useUserStore((state) => state);
  const { filledBottleIds, emptyBottleIds, ticketIds, roles, isWetlisted } = user;

  const filledBottleRoles = useMemo(() => {
    return roles.filter((r) => !r.enthusiast && !r.claimed);
  }, [roles]);

  const emptyBottleRoles = useMemo(() => {
    return roles.filter((r) => r.enthusiast && !r.claimed);
  }, [roles]);

  useEffect(() => {
    async function createProfile() {
      // If user is discord auth and wallet connected
      // add him to the db
      if (currentAccount && session) {
        const userId = session.user.id;
        const doesExist = await doesRowExist(userId);
        if (!doesExist)
          await createHalcyonProfile(session.user.identities![0].id, currentAccount.address);
      }
    }
    createProfile();
  }, [currentAccount, session]);

  const dispenser = useDispenserStore((state) => state);
  const {
    buyRandomBottle,
    buyRandomBottleWithCoins,
    claimFilledBottle,
    claimRandomBottle,
    recycle,
    register,
    swapNft
  } = useSendTx();

  const { handleResult, handleResultClaimFromDiscord } = useHandleResult();

  const handleBuy = async (dispenser: DispenserStore) => {
    const batchOrNot = getBatchOrNot(dispenser, user);
    if (batchOrNot === Batch.Sui) {
      const result = await buyRandomBottle();
      await handleResult(result, config);
    } else {
      const result = await buyRandomBottleWithCoins();
      await handleResult(result, config);
    }
  };

  const handleRecycle = async () => {
    const result = await recycle();
    await handleResult(result, config);
  };

  const handleSwap = async () => {
    const result = await swapNft();
    await handleResult(result, config);
  };

  const handleClaim = async () => {
    if (filledBottleRoles.length > 0) {
      const result = await claimFilledBottle();
      await handleResultClaimFromDiscord(result, config, filledBottleRoles[0].role);
    } else if (emptyBottleRoles.length > 0) {
      const result = await claimRandomBottle();
      await handleResultClaimFromDiscord(result, config, emptyBottleRoles[0].role);
    }
  };

  const handleRegister = async () => {
    const result = await register();
    await handleResult(result, config);
  };

  return (
    <div className="saira relative w-full flex justify-between">
      <div className="bg-no-repeat bg-bottom bg-contain bg-[url('/static/images/products/distributeur.png')] w-full h-[65vh] mr-30" />
      <div className="w-full h-[30vh] rounded-md">
        <div className="uppercase text-md font-bold mt-2 flex justify-center mb-7">
          quench your thirst, get a bottle!
        </div>
        <div className="mt-4 px-2 flex justify-center ">
          <button
            disabled={session === null || getBatchOrNot(dispenser, user) === Batch.Closed}
            onClick={() => handleBuy(dispenser)}
            className="text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-md mr-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            Buy
          </button>
          <button
            disabled={session === null || emptyBottleIds.length < 5}
            onClick={() => handleRecycle()}
            className="text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-md ml-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            Recycle
          </button>
        </div>
        <div className="mt-4 px-2 flex justify-center">
          <button
            disabled={session === null || ticketIds.length === 0}
            onClick={() => handleSwap()}
            className="text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-md mr-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            Swap
          </button>
          <button
            disabled={
              //session === null || (filledBottleRoles.length === 0 && emptyBottleRoles.length === 0)
              true
            }
            onClick={() => handleClaim()}
            className="text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-md ml-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            Claim
          </button>
        </div>
        <div className="mt-4 px-2 flex justify-center">
          <button
            disabled={filledBottleIds.length === 0 || isWetlisted === true}
            onClick={() => handleRegister()}
            className="text-xl relative w-full hover:bg-cyan-600 bg-cyan-500 font-bold text-mvxCyan rounded-md px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            Register
          </button>
        </div>
        {/* <div className="mt-8">
            <UserStatus /> 
            <div className="text-center uppercase font-light mt-36">Connect with both Discord and a Sui Wallet</div>
        </div> */}
        <div className="mt-8">{
          session && currentAccount !== null ?
            <UserStatus /> :
            <div className="text-center uppercase font-light mt-36">Connect with both Discord and a Sui Wallet</div>
          }
        </div>
      </div>
    </div>
  );
};

export default DispenserDrawing;
