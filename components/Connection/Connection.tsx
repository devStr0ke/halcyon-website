import Image from 'next/image';

import { FiLogOut } from 'react-icons/fi';
import useAuth, { signOut } from '../../hooks/useAuth';
import LoginDiscord from '../LoginDiscord/LoginDiscord';
import DispenserStatus from '../Dispenser/DispenserStatus';
import SuiConnect from '../Connect/SuiConnect';
import { useDispenserStore, useUserStore } from '../../store/store';

const Connection = () => {
  const dispenser = useDispenserStore();
  const { session } = useAuth();
  const { isWetlisted } = useUserStore((state) => state);

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex w-full justify-start'>
          <div className='mr-1 py-2 px-3 mx-0'>{<DispenserStatus />}</div>
        </div>
        <div className="flex justify-end w-full h-full">
          {session ? (
            <div className="flex items-center">
              <Image
                width={40}
                height={40}
                className="rounded-full"
                alt="avatar"
                src={session.user.user_metadata.avatar_url}
              />
              <div className="h-fit ml-2">{session.user.user_metadata.full_name}</div>
              <button
                className="text-gray-400 hover:text-blue-600 font-bold py-2 px-3 rounded-full mr-4"
                onClick={() => signOut()}>
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className='mr-1'><LoginDiscord /></div>
          )}
          <div className='ml-1'><SuiConnect /></div>
        </div>
      </div>
      { isWetlisted && (
          <div className="bg-green-200 w-full border border-green-400 rounded-md mx-0 p-0 px-3">
            <p className='text-center'>Congratulations, you are wetlisted!</p>
          </div>
        )}
    </>
  );
};

export default Connection;
