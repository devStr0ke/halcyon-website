import { useEffect } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';

import useAuth from '../../backend/supabase/useAuth';
import { useUserStore } from '../../store/userStore';
import { useModalStore, usePasswordModalStore } from '../../store/transactionStore';

import Interactions from './Dispenser/Interactions';
import Connection from './Dispenser/Connection/Connection';
import Inventory from './Dispenser/Inventory';
import BatchStatus from './Dispenser/BatchStatus';
import ResultModal from './Modals/ResultModal';
import PasswordModal from './Modals/PasswordModal';

const Dispenser = (props: any) => {
  const { currentAccount } = useWalletKit();
  const { session } = useAuth();
  const { status } = useUserStore((state) => state);

  const { isModalOpened } = useModalStore((state) => state);
  const { isPasswordModalOpened } = usePasswordModalStore((state) => state);

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

  useEffect(() => {
    if (isPasswordModalOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPasswordModalOpened]);

  return (
    <div className="relative h-[200vh] w-full p-5">
      <div ref={props.opacityBlur} className="z-10 absolute top-0 w-full h-[100vh] opacity-0"></div>
      <div ref={props.blurBackground} className="z-0 h-[100vh] w-full sticky top-0 bg-no-repeat"></div>
      <div className="hidden lg:block heroHeader sticky top-0 z-20 w-full h-[120vh]">
        {isPasswordModalOpened && <PasswordModal />}
        {isModalOpened && <ResultModal />}
        <div className="h-[65px]" />
        <div className="border-2 border-red-400 bg-red-100 mt-2 mx-16 p-2 rounded-md h-[65px] flex justify-center items-center">
          <p className="text-red-700 text-center">
            Our Dapp is in its early development phase and running on Sui Testnet which is still
            experimental. As we fine-tune the experience, you might encounter some hiccups. Kindly
            share any issues on our Discord. Let&apos;s build together!
          </p>
        </div>
        <div className='flex justify-around mx-16 mt-7'>
          <BatchStatus />
          <Connection />
        </div>
        <div className="saira relative w-full flex justify-between">
          <div className='w-[50vw]'>
            <div className="bg-no-repeat bg-bottom bg-contain bg-[url('/static/images/products/distributeur.png')] w-full h-[65vh]" />
          </div>
          <div className='flex flex-col mr-72 mt-10 w-[30vw]'>
            <Interactions />
            {session && currentAccount !== null && status === 'succeeded' ? (
              <Inventory />
            ) : (
              <div className="flex justify-center items-center h-10 text-center uppercase text-2xl font-light animate-pulse">
                Connect with both Discord and a Sui Wallet
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[100vh] flex justify-center items-center text-red-400 font-bold lg:hidden">
        The dispenser is made to be used on desktop only!
      </div>
    </div>
  )
};

export default Dispenser;
