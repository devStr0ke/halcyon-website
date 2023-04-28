import { useEffect } from 'react';
import { useModalStore, usePasswordModalStore } from '../../store/transactionStore';
import { useUserStore } from '../../store/userStore';

import Interactions from './Dispenser/Interactions';
import Connection from './Dispenser/Connection/Connection';
import Inventory from './Dispenser/Inventory';
import BatchStatus from './Dispenser/BatchStatus';
import ResultModal from './Modals/ResultModal';
import PasswordModal from './Modals/PasswordModal';

const Dispenser = (props: any) => {
  const { isModalOpened } = useModalStore((state) => state);
  const { isPasswordModalOpened } = usePasswordModalStore((state) => state);
  const { isWetlisted } = useUserStore((state) => state);

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
    <div className="relative h-[300vh] w-full p-0">
      <div ref={props.blurBackground} className="z-0 h-[100vh] w-full sticky top-0 bg-no-repeat"></div>
      <div className="heroHeader sticky top-0 z-20 h-[110vh]">
        {isPasswordModalOpened && <PasswordModal />}
        {isModalOpened && <ResultModal />}
        <div ref={props.dispenserRef} className="h-[65px] w-full"/>
        <div className="border-2 border-red-400 bg-red-100 mt-2 mx-2 lg:mx-16 p-2 rounded-md h-[70px] lg:h-[65px] flex justify-center items-center">
          <p className="text-red-700 text-center text-xs sm:text-sm md:text-md">
            Our Dapp is in its early development phase and running on Sui Testnet which is still
            experimental. As we fine-tune the experience, you might encounter some hiccups. Kindly
            share any issues on our Discord. Let&apos;s build together!
          </p>
        </div>
        <div className='lg:hidden'>
          <BatchStatus />
        </div>
        <div className='mt-2 lg:hidden'>
          <Connection />
        </div>
        <div className='hidden lg:flex mx-16 mt-2'>
          <BatchStatus />
          <Connection />
        </div>
        <div className='mt-2 flex justify-center mx-2 lg:mx-16'>
          { isWetlisted && (
            <div className="bg-green-200 border w-full border-green-400 rounded-md">
              <p className='text-center text-green-700'>Congratulations, you are wetlisted! You won&apos;t get a role on Discord we have your address now</p>
            </div>
          )}
        </div>
        <div className="hidden saira w-full lg:flex justify-between">
          <div className='w-[50vw]'>
            <div className="bg-no-repeat bg-bottom bg-contain bg-[url('/static/images/products/distributeur.png')] w-full h-[65vh]" />
          </div>
          <div className='mr-16 lg:mt-10 w-[50vw]'>
            <Interactions />
            <Inventory />
          </div>
        </div>
        <div className='lg:hidden mx-2 sm:mx-16 md:mx-32'>
          <Interactions />
          <Inventory />
        </div>
      </div>
    </div>
  )
};

export default Dispenser;
