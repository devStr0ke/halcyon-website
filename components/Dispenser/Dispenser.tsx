import { useWalletKit } from '@mysten/wallet-kit';
import { useEffect } from 'react';
import { useDispenserStore, useModalStore, useUserStore } from '../../store/store';

import DispenserDrawing from './DispenserDrawing';

import useAuth from '../../hooks/useAuth';
import { createHalcyonProfile, doesRowExist } from '../../utils/supabase';
import DispenserStatus from './BatchStatus';

import Connection from '../Connection/Connection';
import UserStatus from '../UserStatus/UserStatus';
import DiscordRoles from '../DiscordRoles/DiscordRoles';

const Dispenser = () => {
  const { currentAccount } = useWalletKit();
  const { session } = useAuth();

  const { isModalOpened, modelContent, isBottleFilled, setShowModal } = useModalStore(
    (state) => state
  );

  const { roles } = useUserStore((state) => state);

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
  console.log(session);

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
        lose your entire wallet! So remember to register your wetlist ASAP.a
      </div>

      <div className="w-full h-full flex justify-around">
        <div className="w-2/5">
          <DispenserDrawing />
        </div>

        <div className="w-3/5">
          <Connection />
          <DispenserStatus />
          <div className="text-center py-6 bg-cyan-100 border border-cyan-400 rounded-xl my-4">
            <p>
              The Dispenser is a gamified on-chain whitelisting tool allowing Sui community members
              to get tokenized Wetlists in the form of Bottles NFTs for our Thirsty Monkeys
              collection.
            </p>
            <p>How does it work?</p>
            <p>
              Get a Filled Bottle and burn it to register your Wetlist and Many mechanisms have been
              implemented to allow everyone to get Bottles!
            </p>
            <li>Wait for a batch to open and buy random bottles with $SUI</li>
            <li>Recycle five empty bottles to get a free entry</li>
            <li>Win a Voucher during a Mint Event and swap it for a filled bottle</li>
            <li>Participate in an IDO Event to get coins and buy random bottles</li>
            <li>Earn a Thirsty or Wetlist role on Discord to claim a filled bottle</li>
            <li>Win Enthusiast roles on Discord to claim random bottles</li>
            <p>
              Read more{' '}
              <a
                className="text-cyan-400"
                href="https://medium.com/@HalcyonBuilders/one-small-step-for-halcyon-one-giant-leap-for-web3-330064894efb">
                in this article
              </a>{' '}
              and join us{' '}
              <a className="text-cyan-400" href="https://discord.gg/ZbQ3TPbzPT">
                on Discord
              </a>
            </p>
          </div>

          {session && currentAccount !== null && <UserStatus />}

          {session && <DiscordRoles />}
        </div>
      </div>
    </div>
  );
};

export default Dispenser;
