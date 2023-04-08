import { useUserStore, useDispenserStore, useConfigStore } from '../../store/store';
import { useSendTx } from '../../backend/dispenser/useSendTx';
import { BatchOrNot, DispenserStore } from '../../types/suiDispenser';
import { getBatchOrNot } from '../../backend/dispenser/dispenserStatus';
import { useHandleResult } from '../../hooks/useHandleResult';
import { useMemo } from 'react';

const DispenserDrawing = () => {
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
    <div className="relative w-full">
      <div className="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/distributeur.png')] w-full h-[70vh]">
        <div className="absolute w-full h-56 bottom-0">
          <div className="absolute inset-0 -skew-y-[2deg]">
            <button
              disabled={getBatchOrNot(dispenser, user) === BatchOrNot.Closed}
              onClick={() => handleBuy(dispenser)}
              className="absolute text-2xl hover:text-cyan-700 text-cyan-500 font-bold py-2 px-4 rounded disabled:text-slate-400"
              style={{ top: '10%', left: '45%', transform: 'translate(-50%, -50%)' }}>
              Buy
            </button>
            <button
              disabled={emptyBottleIds.length < 5}
              onClick={() => handleRecycle()}
              className="absolute text-2xl hover:text-cyan-700 text-cyan-500 font-bold py-2 px-4 rounded disabled:text-slate-400"
              style={{ top: '12%', left: '71%', transform: 'translate(-50%, -50%)' }}>
              Recycle
            </button>
            <button
              disabled={ticketIds.length === 0}
              onClick={() => handleSwap()}
              className="absolute text-2xl hover:text-cyan-700 text-cyan-500 font-bold py-2 px-4 rounded disabled:text-slate-400"
              style={{ top: '40%', left: '45%', transform: 'translate(-50%, -50%)' }}>
              Swap
            </button>
            <button
              disabled={filledBottleRoles.length === 0 && emptyBottleRoles.length === 0}
              onClick={() => handleClaim()}
              className="absolute text-2xl hover:text-cyan-700 text-cyan-500 font-bold py-2 px-4 rounded disabled:text-slate-400"
              style={{ top: '40%', left: '71%', transform: 'translate(-50%, -50%)' }}>
              Claim
            </button>
          </div>
        </div>
      </div>
      <button
        disabled={filledBottleIds.length === 0 || isWetlisted === true}
        onClick={() => handleRegister()}
        className="relative w-full hover:bg-cyan-700 bg-cyan-500 font-bold text-white py-2 px-4 rounded disabled:bg-slate-400">
        Register
      </button>
    </div>
  );
};

export default DispenserDrawing;
