import { useUserStore, useDispenserStore } from '../../store/store';
import { useSendTx } from '../../backend/dispenser/useSendTx';
import { BatchOrNot, DispenserStore } from '../../types/suiDispenser';
import { getBatchOrNot } from '../../backend/dispenser/dispenserStatus';
import { handleResult } from '../../backend/dispenser/dispenserStatus';

interface DispenserDrawingProps {
  roles: { role: string; claimed: boolean; enthusiast: boolean }[];
}

const DispenserDrawing: React.FC<DispenserDrawingProps> = ({ roles }) => {
  // imports
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

  //handle clicks
  const handleBuy = async (dispenser: DispenserStore) => {
    const batchOrNot = getBatchOrNot(dispenser, user);
    if (batchOrNot === BatchOrNot.SuiSupply || batchOrNot === BatchOrNot.SuiTime) {
      const result = await buyRandomBottle();
      handleResult(result);
    } else {
      const result = await buyRandomBottleWithCoins();
      handleResult(result);
    }
  }

  const handleRecycle = async () => {
    const result = await recycle();
    handleResult(result);
  }

  const handleSwap = async () => {
    const result = await swapNft();
    handleResult(result);
  }

  const handleClaim = async () => {
    if (
      roles.filter((r) => r.enthusiast === false).filter((r) => r.claimed === false)
        .length > 0
    ) {
      const result = await claimFilledBottle();
      handleResult(result);
    }
    else if (
      roles.filter((r) => r.enthusiast === true).filter((r) => r.claimed === false)
        .length > 0
    ) {
      const result = await claimRandomBottle();
      handleResult(result);
    }
  }

  const handleRegister = async () => {
    const result = await register();
    handleResult(result);
  }

  return (
    <div className="">
      <div className="bg-no-repeat bg-center bg-cover bg-[url('/static/images/products/distributeur.png')] p-6 rounded-lg w-full h-[90vh] flex flex-col justify-end">
        <div className="w-full grid grid-cols-2 gap-4">
          <button
            disabled={getBatchOrNot(dispenser, user) === BatchOrNot.Closed}
            onClick={() => handleBuy(dispenser)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
            Buy
          </button>
          <button
            disabled={emptyBottleIds.length < 5}
            onClick={() => handleRecycle()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
            Recycle
          </button>
          <button
            disabled={ticketIds.length === 0}
            onClick={() => handleSwap()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
            Claim
          </button>
          <button
            disabled={filledBottleIds.length === 0}
            onClick={() => handleRegister()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -skew-y-[2deg] disabled:bg-slate-400">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default DispenserDrawing;
