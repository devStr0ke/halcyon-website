import { useWalletKit } from '@mysten/wallet-kit';
import { useEffect } from 'react';
import { useDispenserStore, useUserStore } from '../../store/store';
import Connect from '../Connect/Connect';
import DispenserDrawing from './DispenserDrawing';

import LoginDiscord from '../LoginDiscord/LoginDiscord';
import useAuth, { signOut } from '../../hooks/useAuth';
import { createHalcyonProfile, doesRowExist } from '../../utils/supabase';
import DispenserStatus from './BatchStatus';
import { useHandleResult } from '../../hooks/useHandleResult';

const Dispenser = () => {
  const { currentAccount } = useWalletKit();
  const { session } = useAuth();
  const { Modal, setShowModal } = useHandleResult();

  const { roles, filledBottleIds, emptyBottleIds, ticketIds, loading, isWetlisted } = useUserStore(
    (state) => state
  );
  const dispenser = useDispenserStore((state) => state);

  useEffect(() => {
    async function createProfile() {
      // If user is discord auth and wallet connected
      // add him to the db
      if (currentAccount && session) {
        const userId = session.user.id;
        const doesExist = await doesRowExist(userId);
        if (!doesExist) await createHalcyonProfile(userId, currentAccount.address);
      }
    }
    createProfile();
  }, [currentAccount, session]);

  useEffect(() => {
    if (roles) {
      console.log(roles);
    }
  }, [roles]);

  return (
    <div className="w-[98vw] h-[150vh] pt-36 bg-gray-300 flex flex-col items-center justify-start">
      <Modal />
      <button onClick={() => setShowModal(true)}>AAAA</button>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
        Beware, the obtained NFTs live on Sui devnet, which is frequently reset. This will make you
        lose your entire wallet! So remember to register your wetlist ASAP.
      </div>
      <div className="w-full h-full flex justify-around">
        <div className="w-2/5">
          <DispenserDrawing />
        </div>

        <div className="w-2/5">
          {!loading && !dispenser.loading && <DispenserStatus />}
          <div className="text-center py-12 bg-cyan-100 border border-cyan-400 rounded-xl my-4">
            How does it works?
          </div>

          <div className="flex w-full justify-center mb-4">
            <Connect />
          </div>

          {session ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => signOut()}>
              Disconnect discord
            </button>
          ) : (
            <LoginDiscord />
          )}

          {session && (
            <div className="mb-6 w-full">
              <h2 className="text-center mb-3">Discord Roles</h2>
              <div className="flex justify-between items-center mb-2">
                <p>Claim a filled bottle</p>
                <div className="flex justify-between">
                  {roles
                    .filter((r) => r.enthusiast === false)
                    .map((r) => (
                      <div
                        key={r.role}
                        className={`bg-purple-${
                          r.claimed ? '300' : '100'
                        } border border-purple-400 rounded-xl mx-4 p-1 px-3`}>
                        {r.role}
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex items-center mb-2 justify-between">
                <p>Claim a random bottle</p>
                <div className="flex">
                  {roles
                    .filter((r) => r.enthusiast === true)
                    .map((r) => (
                      <div
                        key={r.role}
                        className={`bg-purple-${
                          r.claimed ? '300' : '100'
                        } border border-purple-400 rounded-xl mx-4 p-1 px-3`}>
                        {r.role}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {session && currentAccount !== null && (
            <>
              <div className="mb-4">
                <div className="text-center">
                  {`You have ${filledBottleIds.length} filled bottles to burn or give to your
                    friends`}
                </div>
                <div className="text-center">
                  {`You have ${ticketIds.length} Monkeys to swap for a filled bottle`}
                </div>
                <div className="text-center">
                  {`You have ${emptyBottleIds.length} empty bottles to recycle`}
                </div>
              </div>
            </>
          )}
          {isWetlisted && (
            <div className="bg-green-300 mx-auto w-fit border border-green-400 rounded-xl mx-4 p-1 px-3">
              You are wetlisted!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dispenser;
