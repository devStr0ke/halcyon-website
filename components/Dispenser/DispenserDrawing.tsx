import { useUserStore, useDispenserStore, useConfigStore } from '../../store/store';
import { useSendTx } from '../../backend/dispenser/useSendTx';
import { BatchOrNot, DispenserStore } from '../../types/suiDispenser';
import { getBatchOrNot } from '../../backend/dispenser/dispenserStatus';
import { useHandleResult } from '../../backend/dispenser/useHandleResult';

interface DispenserDrawingProps {
  roles: { role: string; claimed: boolean; enthusiast: boolean }[];
}

const DispenserDrawing: React.FC<DispenserDrawingProps> = ({ roles }) => {
  // imports

  const config = useConfigStore((state) => state);
  const user = useUserStore((state) => state);
  const { testCoinIds, filledBottleIds, emptyBottleIds, ticketIds } = user;
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

  const { handleResult } = useHandleResult();

  //handle clicks
  const handleBuy = async (dispenser: DispenserStore) => {
    const batchOrNot = getBatchOrNot(dispenser, user);
    if (batchOrNot === BatchOrNot.SuiSupply || batchOrNot === BatchOrNot.SuiTime) {
      const result = await buyRandomBottle();
      handleResult(result, config);
    } else {
      const result = await buyRandomBottleWithCoins();
      handleResult(result, config);
    }
  };

  const handleRecycle = async () => {
    const result = await recycle();
    handleResult(result, config);
  };

  const handleSwap = async () => {
    const result = await swapNft();
    handleResult(result, config);
  };

  const handleClaim = async () => {
    if (roles.filter((r) => r.enthusiast === false).filter((r) => r.claimed === false).length > 0) {
      const result = await claimFilledBottle();
      handleResult(result, config);
    } else if (
      roles.filter((r) => r.enthusiast === true).filter((r) => r.claimed === false).length > 0
    ) {
      const result = await claimRandomBottle();
      handleResult(result, config);
    }
  };

  const handleRegister = async () => {
    const result = await register();
    handleResult(result, config);
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
              disabled={
                roles.filter((r) => r.enthusiast === false).filter((r) => r.claimed === false)
                  .length === 0 &&
                roles.filter((r) => r.enthusiast === true).filter((r) => r.claimed === false)
                  .length === 0
              }
              onClick={() => handleClaim()}
              className="absolute text-2xl hover:text-cyan-700 text-cyan-500 font-bold py-2 px-4 rounded disabled:text-slate-400"
              style={{ top: '40%', left: '71%', transform: 'translate(-50%, -50%)' }}>
              Claim
            </button>
          </div>
        </div>
      </div>
      <button
        disabled={filledBottleIds.length === 0}
        onClick={() => handleRegister()}
        className="relative w-full hover:bg-cyan-700 bg-cyan-500 font-bold text-white py-2 px-4 rounded disabled:bg-slate-400">
        Register
      </button>
    </div>
  );
};

export default DispenserDrawing;
