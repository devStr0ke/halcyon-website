import { useWalletKit } from '@mysten/wallet-kit';
import { useEffect } from 'react';
import { useDispenserStore, useModalStore, useUserStore } from '../../store/store';
import Connect from '../Connect/Connect';
import DispenserDrawing from './DispenserDrawing';

import LoginDiscord from '../LoginDiscord/LoginDiscord';
import useAuth, { signOut } from '../../hooks/useAuth';
import { createHalcyonProfile, doesRowExist } from '../../utils/supabase';
import DispenserStatus from './BatchStatus';

const Dispenser = () => {
  const { currentAccount } = useWalletKit();
  const { session } = useAuth();

  const { isModalOpened, modelContent, isBottleFilled, setShowModal } = useModalStore(
    (state) => state
  );

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

  // Disable scrolling while modal is opened
  useEffect(() => {
    if (isModalOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpened]);

  return (
    <div className="w-[98vw] h-[150vh] pt-36 bg-gray-300 flex flex-col items-center justify-start">
      {isModalOpened && (
        <div className={`absolute inset-0 flex items-center justify-center z-[998]`}>
          <div className="bg-white p-6 rounded shadow-xl w-fit z-[999]">
            <p className="text-sm">{modelContent}</p>
            {isBottleFilled !== null && isBottleFilled ? (
              <div className="z-0 h-56 w-56 bg-no-repeat bg-cover bg-[url('/static/images/filledBottle.png')]"></div>
            ) : (
              <div className="z-0 h-56 w-56 bg-no-repeat bg-cover bg-[url('/static/images/emptyBottle.png')]"></div>
            )}

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setShowModal(false)}>
              Close Modal
            </button>
          </div>
          <div className="absolute inset-0 bg-black opacity-50 z-[998]" />
        </div>
      )}

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
            <p>
              The Dispenser is a gamified on-chain whitelisting tool allowing Sui community members to get tokenized Wetlists in the form of Bottles NFTs for our Thirsty Monkeys collection.
            </p>
            <p>How does it work?</p>
            <p>
              Get a Filled Bottle and burn it to register your Wetlist and Many mechanisms have been implemented to allow everyone to get Bottles!
            </p>
            <li>Wait for a batch to open and buy random bottles with $SUI</li>
            <li>Recycle five empty bottles to get a free entry</li>
            <li>Win a Voucher during a Mint Event and swap it for a filled bottle</li>
            <li>Participate in an IDO Event to get coins and buy random bottles</li>
            <li>Earn a Thirsty or Wetlist role on Discord to claim a filled bottle</li>
            <li>Win Enthusiast roles on Discord to claim random bottles</li>
            <p>
              Read more <a className="text-cyan-400" href="https://medium.com/@HalcyonBuilders/one-small-step-for-halcyon-one-giant-leap-for-web3-330064894efb">in this article</a> and join us <a className="text-cyan-400" href="https://discord.gg/ZbQ3TPbzPT">on Discord</a>
            </p>
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
                  {`You have ${filledBottleIds.length} filled bottles to burn or give to your friends`}
                </div>
                <div className="text-center">
                  {`You have ${ticketIds.length} voucher(s) to swap for a filled bottle`}
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
