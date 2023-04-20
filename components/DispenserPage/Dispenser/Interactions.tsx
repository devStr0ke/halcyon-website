import { useEffect, useMemo } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';

import { useDispenserStore } from '../../../store/dispenserStore';
import { useUserStore } from '../../../store/userStore';
import { useTransactionStore } from '../../../store/transactionStore';

import useHandleInteractions from '../../../backend/dispenser/useHandleInteractions';
import { createHalcyonProfile, doesRowExist } from '../../../backend/supabase/supabase';
import useAuth from '../../../backend/supabase/useAuth';
import { getBatchOrNot } from '../../../backend/dispenser/dispenserStatus';
import { Batch } from '../../../types/sui';

const Interactions = () => {
  const { session } = useAuth();
  const { currentAccount } = useWalletKit();
  
  const { confirmed, disabled } = useTransactionStore();
  const dispenser = useDispenserStore((state) => state);
  const user = useUserStore((state) => state);
  const {
    filledBottleIds,
    emptyBottleIds,
    ticketIds,
    roles,
    isWetlisted,
    status,
    suiBalance,
    testCoinBalance,
  } = user;

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

  const { handleClaim, handleRecycle, handleRegister, handleSwap, handlePasswordModal } = useHandleInteractions()

  const loader = (
    <svg className="animate-spin h-5 w-5 mr-3 text-cyan-500" viewBox="0 0 24 24">
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <div className="w-full h-[20vh] rounded-md">
      <div className="uppercase text-md font-bold flex justify-center mb-2">
        quench your thirst, get a bottle!
      </div>
      <div className="mt-2 flex justify-center ">
        <button
          disabled={
            /*disabled ||
            session === null ||
            getBatchOrNot(dispenser) === Batch.Closed ||
            (suiBalance === 0 && testCoinBalance === 0)*/
            true
          }
          onClick={() => handlePasswordModal()}
          className="flex justify-center items-center xl:h-10 lg:text-lg xl:text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-xl mr-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
          {disabled || status === 'loading' ? loader : 'Buy'}
        </button>
        <button
          disabled={disabled || session === null || emptyBottleIds.length < 5}
          onClick={() => handleRecycle()}
          className="flex justify-center items-center h-10 lg:text-lg xl:text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-xl ml-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
          {disabled || status === 'loading'
            ? loader
            : confirmed
            ? 'Burn 5 Empty Bottles?'
            : 'Recycle'}
        </button>
      </div>
      <div className="mt-2 flex justify-center">
        <button
          disabled={disabled || session === null || ticketIds.length === 0}
          onClick={() => handleSwap()}
          className="flex justify-center items-center h-10 lg:text-lg xl:text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-xl mr-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
          {disabled || status === 'loading' ? loader : 'Swap'}
        </button>
        <button
          disabled={
            disabled ||
            session === null ||
            (filledBottleRoles.length === 0 && emptyBottleRoles.length === 0)
          }
          onClick={() => handleClaim()}
          className="flex justify-center items-center h-10 lg:text-lg xl:text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-xl ml-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
          {disabled || status === 'loading' ? loader : 'Claim'}
        </button>
      </div>
      <div className="mt-2 flex justify-center">
        <button
          disabled={disabled || filledBottleIds.length === 0 || isWetlisted === true}
          onClick={() => handleRegister()}
          className="flex justify-center items-center h-10 lg:text-lg xl:text-xl relative w-full hover:bg-cyan-600 bg-cyan-500 font-bold text-white rounded-xl px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
          {disabled || status === 'loading' ? loader : 'Register'}
        </button>
      </div>
      {disabled && (
        <p className="text-red-400 text-center mt-2">Don&apos;t refresh, it&apos;s useless!</p>
      )}
    </div>
  );
};

export default Interactions;
