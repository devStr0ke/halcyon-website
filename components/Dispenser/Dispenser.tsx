import { useWalletKit } from '@mysten/wallet-kit';
import { useEffect, useState } from 'react';
import { useDispenserStore, useUserStore } from '../../store/store';
import Connect from '../Connect/Connect';
import DispenserDrawing from './DispenserDrawing';

import LoginDiscord from '../LoginDiscord/LoginDiscord';
import useAuth, { signOut } from '../../hooks/useAuth';
import {
  createHalcyonProfile,
  updateIsWetlisted,
  doesRowExist,
  getIsWetlisted,
  getRoleUpdatesForUser
} from '../../utils/supabase';
import DispenserStatus from './BatchStatus';

const Dispenser = () => {
  const { currentAccount } = useWalletKit();
  const { session } = useAuth();

  const [isWetlisted, setIsWetlisted] = useState(false);
  const [roles, setRoles] = useState<{ role: string; claimed: boolean; enthusiast: boolean }[]>([]);

  //useStoreContractInfo();
  //const { isUserInfoFetching } = useStoreUserInfo(currentAccount);

  /*useEffect(() => {
    console.log('isUserInfoFetching', isUserInfoFetching);
  }, [isUserInfoFetching]);*/

  const { testCoinIds, filledBottleIds, emptyBottleIds, ticketIds } = useUserStore(
    (state) => state
  );
  const { active, price, supply, balance, left } = useDispenserStore((state) => state);

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
    async function isWetlisted(userId: string) {
      const ret = await getIsWetlisted(userId);
      if (ret === true) setIsWetlisted(true);
      else setIsWetlisted(false);
    }
    if (session) {
      isWetlisted(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    async function fetchRoles(useId: string) {
      const roles = await getRoleUpdatesForUser(useId);
      console.log(roles);
      if (roles)
        setRoles(
          roles.map((e) => ({ role: e.role, claimed: e.claimed, enthusiast: e.enthusiast }))
        );
    }
    if (session) {
      fetchRoles(session.user.user_metadata.provider_id);
    }
  }, [session]);

  return (
    <div className="w-screen h-[150vh] py-40 bg-gray-300 flex flex-col items-center justify-start">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-12">
        Beware, the obtained NFTs live on Sui devnet, which is frequently reset. This will make you
        lose your entire wallet! So remember to register your wetlist ASAP.
      </div>
      <div className="w-full h-full flex justify-around">
        <div className="w-2/5">
          <DispenserDrawing roles={roles} />
        </div>

        <div className="w-2/5">
          <DispenserStatus />
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

              <div className="w-full flex justify-center">
                {isWetlisted ? (
                  <div className="bg-green-300 border border-green-400 rounded-xl mx-4 p-1 px-3">
                    wetlisted
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      console.log('click');
                      // TODO: burn
                      await updateIsWetlisted(session.user.id, true);
                      setIsWetlisted(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Burn filled bottle & register wetlist
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dispenser;
