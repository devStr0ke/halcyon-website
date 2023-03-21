import { useWalletKit } from '@mysten/wallet-kit';
import { useEffect } from 'react';
import useStoreContractInfo from '../../backend/dispenser/useStoreContractInfo';
import useStoreUserInfo from '../../backend/dispenser/useStoreUserInfo';
import { useUserStore } from '../../store/store';
import Connect from '../Connect/Connect';
import DispenserDrawing from './DispenserDrawing';

const Dispenser = () => {
  const { currentAccount } = useWalletKit();

  //useStoreContractInfo();
  //const { isUserInfoFetching } = useStoreUserInfo(currentAccount);

  /*useEffect(() => {
    console.log('isUserInfoFetching', isUserInfoFetching);
  }, [isUserInfoFetching]);*/

  const { coinObjectId, emptyBottleIds } = useUserStore((state) => state);
  console.log('coinObjectId', coinObjectId);
  console.log('emptyBottleIds', emptyBottleIds);

  return (
    <div className="w-screen h-screen py-40 bg-gray-100 flex flex-col items-center justify-start">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-12">
        Beware, the obtained NFTs live on Sui devnet, which is frequently reset. This will make you
        lose your entire wallet! So remember to register your wetlist ASAP.
      </div>

      <div className="w-full flex justify-around">
        <div className="w-2/5">
          <DispenserDrawing />
        </div>

        <div className="w-2/5">
          <div className="flex flex-col justify-between px-10">
            <p>Current/Upcoming Batch: </p>
            <p className="text-center">X Bottles Availabe</p>
            <p className="text-center">Y Bottles Minted</p>
            <p className="text-center">Z Filled Minted</p>
          </div>
          <div className="text-center py-12 bg-cyan-100 border border-cyan-400 rounded-xl my-4">
            How does it works?
          </div>
          <div className="flex w-full justify-between px-10">
            {currentAccount === null ? (
              <div className="mb-10 flex justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Connect Discord
                </button>
                <Connect />
              </div>
            ) : (
              <div className="mb-6 w-full">
                <h2 className="text-center mb-3">Discord Roles</h2>
                <div className="flex justify-between items-center mb-2">
                  <p>Claim a filled bottle</p>
                  <div className="flex justify-between">
                    <div className="bg-purple-300 border border-purple-400 rounded-xl mx-4 p-1 px-3">
                      thirsty
                    </div>
                    <div className="bg-purple-100 border border-purple-400 rounded-xl mx-4 p-1 px-3">
                      wetlist
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-2 justify-between">
                  <p>Claim a random bottle</p>
                  <div className="flex">
                    <div className="bg-purple-300 border border-purple-400 rounded-xl mx-1 p-1 px-3">
                      roadmap
                    </div>
                    <div className="bg-purple-100 border border-purple-400 rounded-xl mx-1 p-1 px-3">
                      website
                    </div>
                    <div className="bg-purple-100 border border-purple-400 rounded-xl mx-1 p-1 px-3">
                      dispenser
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-center">
                    You have X filled bottles to burn or give to your friends
                  </div>
                  <div className="text-center">You have X Monkeys to swap for a filled bottle</div>
                  <div className="text-center">You have Z empty bottles to recycle</div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Burn filled bottle & register wetlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dispenser;
