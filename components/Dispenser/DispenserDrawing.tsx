import { useUserStore, useDispenserStore, useConfigStore } from '../../store/store';
import { useSendTx } from '../../backend/dispenser/useSendTx';
import { Batch, DispenserStore } from '../../types/sui';
import { getBatchOrNot } from '../../backend/dispenser/dispenserStatus';
import { useHandleResult } from '../../backend/dispenser/useHandleResult';
import { useEffect, useMemo, useState } from 'react';
import UserStatus from '../UserStatus/UserStatus';
import useAuth from '../../hooks/useAuth';
import { useWalletKit } from '@mysten/wallet-kit';
import { createHalcyonProfile, doesRowExist } from '../../utils/supabase';

const DispenserDrawing = () => {
  const { session } = useAuth();
  const { currentAccount } = useWalletKit();
  const config = useConfigStore((state) => state);
  const user = useUserStore((state) => state);
  const { filledBottleIds, emptyBottleIds, ticketIds, roles, isWetlisted, removeBottles, status, suiBalance, testCoinBalance } = user;
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [disabled, setDisabled] = useState({
    buttons: false,
    buy: false,
    recycle: false,
    swap: false,
    claim: false,
    register: false,
  })

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
    swapNft,
  } = useSendTx();

  const { handleResult, handleResultClaimFromDiscord } = useHandleResult();

  const handleBuy = async (dispenser: DispenserStore) => {
    try {
      setDisabled(prevDisabled => ({ ...prevDisabled, buy: true, buttons: true }));
      const batchOrNot = getBatchOrNot(dispenser);
      if (batchOrNot === Batch.Sui) {
        const result = await buyRandomBottle();
        console.log(result);
        
        await handleResult(result, config);
      } else {
        const result = await buyRandomBottleWithCoins();
        console.log(result);
        
        await handleResult(result, config);
      }
    } finally {
      setDisabled(prevDisabled => ({ ...prevDisabled, buy: false, buttons: false }));
      dispenser.reduceSupply();
    }
  };

  const handleRecycle = async () => {
    if (isConfirmed) {
      try {
        setDisabled(prevDisabled => ({ ...prevDisabled, recycle: true, buttons: true }));
        const result = await recycle();
        await handleResult(result, config);
        if (result?.effects?.status.status === 'success') {
          removeBottles();
        }
      } finally {
        setDisabled(prevDisabled => ({ ...prevDisabled, recycle: false, buttons: false }));
        setIsConfirmed(false);
      }
    } else {
      setIsConfirmed(true);
    }
  };

  const handleSwap = async () => {
    try {
      setDisabled(prevDisabled => ({ ...prevDisabled, swap: true, buttons: true }));
    const result = await swapNft();
    await handleResult(result, config);
    } finally {
      setDisabled(prevDisabled => ({ ...prevDisabled, swap: false, buttons: false }));
    }
  };

  const handleClaim = async () => {
    try {
      setDisabled(prevDisabled => ({ ...prevDisabled, claim: true, buttons: true }));
    if (filledBottleRoles.length > 0) {
      const result = await claimFilledBottle();
      await handleResultClaimFromDiscord(result, config, filledBottleRoles[0].role);
    } else if (emptyBottleRoles.length > 0) {
      const result = await claimRandomBottle();
      await handleResultClaimFromDiscord(result, config, emptyBottleRoles[0].role);
    }
    } finally {
      setDisabled(prevDisabled => ({ ...prevDisabled, claim: false, buttons: false }));
    }
  };

  const handleRegister = async () => {
    try {
      setDisabled(prevDisabled => ({ ...prevDisabled, register: true, buttons: true }));
    const result = await register();
    await handleResult(result, config);
    } finally {
      setDisabled(prevDisabled => ({ ...prevDisabled, register: false, buttons: false }));
    }
  };

  const loader = <svg className="animate-spin h-5 w-5 mr-3 text-cyan-500" viewBox="0 0 24 24">
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>

  return (
    <div className="saira relative w-full flex justify-between">
      <div className="bg-no-repeat bg-bottom bg-contain bg-[url('/static/images/products/distributeur.png')] w-full h-[65vh] mr-30" />
      <div className="w-full h-[30vh] rounded-md">
        <div className="uppercase text-md font-bold flex justify-center mb-7">
          quench your thirst, get a bottle!
        </div>
        <div className="mt-4 px-2 flex justify-center ">
          <button
            disabled={disabled.buttons || session === null || getBatchOrNot(dispenser) === Batch.Closed || (suiBalance === 0 && testCoinBalance === 0)}
            onClick={() => handleBuy(dispenser)}
            className="flex justify-center items-center h-10 text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-xl mr-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            {(disabled.buy || status === "idle" || status === "loading") ? loader : "Buy"}
          </button>
          <button
            disabled={disabled.buttons || session === null || emptyBottleIds.length < 5}
            onClick={() => handleRecycle()}
            className="flex justify-center items-center text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-xl ml-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            {(disabled.recycle || status === "idle" || status === "loading") ? loader : isConfirmed ? 'Burn 5 Empty Bottles?' : 'Recycle'}
          </button>
        </div>
        <div className="mt-4 px-2 flex justify-center">
          <button
            disabled={disabled.buttons || session === null || ticketIds.length === 0}
            onClick={() => handleSwap()}
            className="flex justify-center items-center h-10 text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-xl mr-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            {(disabled.swap || status === "idle" || status === "loading") ? loader : "Swap"}
          </button>
          <button
            disabled={
              //disabled.buttons || session === null || (filledBottleRoles.length === 0 && emptyBottleRoles.length === 0)
              true
            }
            onClick={() => handleClaim()}
            className="flex justify-center items-center h-10 text-xl hover:bg-cyan-600 bg-cyan-500 text-white font-bold w-full rounded-xl ml-1 px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            {(disabled.claim || status === "idle" || status === "loading") ? loader : "Claim"}
          </button>
        </div>
        <div className="mt-4 px-2 flex justify-center">
          <button
            disabled={disabled.buttons || filledBottleIds.length === 0 || isWetlisted === true}
            onClick={() => handleRegister()}
            className="flex justify-center items-center h-10 text-xl relative w-full hover:bg-cyan-600 bg-cyan-500 font-bold text-white rounded-xl px-3 py-1 disabled:bg-gray-200 disabled:text-gray-300">
            {(disabled.register || status === "idle" || status === "loading") ? loader : "Register"}
          </button>
        </div>
        {disabled.buttons && <p className='text-red-400 text-center mt-3'>Don&apos;t refresh, it&apos;s useless!</p>}
        {/* <div className="mt-8">
            <UserStatus /> 
            <div className="text-center uppercase font-light mt-36">Connect with both Discord and a Sui Wallet</div>
        </div> */}
        <div className="mt-8">{
          session && currentAccount !== null ?
            <UserStatus /> :
            <div className="flex justify-center items-center h-10 text-center uppercase font-light mt-36">Connect with both Discord and a Sui Wallet</div>
          }
        </div>
      </div>
    </div>
  );
};

export default DispenserDrawing;
