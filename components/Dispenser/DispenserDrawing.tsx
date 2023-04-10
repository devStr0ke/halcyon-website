import { useUserStore, useDispenserStore, useConfigStore } from '../../store/store';
import { useSendTx } from '../../backend/dispenser/useSendTx';
import { BatchOrNot, DispenserStore } from '../../types/suiDispenser';
import { getBatchOrNot } from '../../backend/dispenser/dispenserStatus';
import { useHandleResult } from '../../backend/dispenser/useHandleResult';
import { useMemo } from 'react';
import useAuth from '../../hooks/useAuth';

const DispenserDrawing = () => {
  const { session } = useAuth();
  const config = useConfigStore((state) => state);
  const user = useUserStore((state) => state);
  const { filledBottleIds, emptyBottleIds, ticketIds, roles, isWetlisted } = user;

  const filledBottleRoles = useMemo(() => {
    return roles.filter((r) => !r.enthusiast && !r.claimed);
  }, [roles]);

  const emptyBottleRoles = useMemo(() => {
    return roles.filter((r) => r.enthusiast && !r.claimed);
  }, [roles]);

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
    if (batchOrNot === BatchOrNot.SuiSupply || batchOrNot === BatchOrNot.SuiTime) {
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
      <div className="w-full h-[65vh] rounded-md">
        <div className="text-2xl font-bold mt-2 flex justify-center">Quench your Thirst, get a Bottle!</div>
        <div className="mt-4 px-2 flex justify-center ">
          <button
            disabled={session === null || getBatchOrNot(dispenser, user) === BatchOrNot.Closed}
            onClick={() => handleBuy(dispenser)}
            className="text-2xl hover:bg-cyan-500 bg-mvxCyan text-white font-bold w-full rounded-md mr-1 disabled:bg-white disabled:text-mvxCyan"
          >
            Buy
          </button>
          <button
            disabled={session === null || emptyBottleIds.length < 5}
            onClick={() => handleRecycle()}
            className="text-2xl hover:bg-cyan-500 bg-mvxCyan text-white font-bold w-full rounded-md ml-1 disabled:bg-white disabled:text-mvxCyan"
          >
            Recycle
          </button>
        </div>
        <div className="mt-4 px-2 flex justify-center">
          <button
            disabled={session === null || ticketIds.length === 0}
            onClick={() => handleSwap()}
            className="text-2xl hover:bg-cyan-500 bg-mvxCyan text-white font-bold w-full rounded-md mr-1 disabled:bg-white disabled:text-mvxCyan"
          >
            Swap
          </button>
          <button
            disabled={
              session === null || (filledBottleRoles.length === 0 && emptyBottleRoles.length === 0)
            }
            onClick={() => handleClaim()}
            className="text-2xl hover:bg-cyan-500 bg-mvxCyan text-white font-bold w-full rounded-md ml-1 disabled:bg-white disabled:text-mvxCyan"
          >
            Claim
          </button>
        </div>
        <div className="mt-4 px-2 flex justify-center">
          <button
            disabled={filledBottleIds.length === 0 || isWetlisted === true}
            onClick={() => handleRegister()}
            className="text-2xl relative w-full hover:bg-cyan-500 bg-mvxCyan fowhite text-mvxCyan rounded-md disabled:bg-white disabled:font-bold"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default DispenserDrawing;
