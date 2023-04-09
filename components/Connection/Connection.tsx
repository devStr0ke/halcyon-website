import Image from 'next/image';

import { FiLogOut } from 'react-icons/fi';
import useAuth, { signOut } from '../../hooks/useAuth';
import LoginDiscord from '../LoginDiscord/LoginDiscord';
import SuiConnect from '../Connect/SuiConnect';
import { useUserStore } from '../../store/store';

const Connection = () => {
  const { session } = useAuth();
  const { isWetlisted } = useUserStore((state) => state);

  return (
    <div className="flex w-full justify-between mb-4">
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
            className="text-gray-400 hover:text-blue-600 font-bold py-2 px-3 rounded-full"
            onClick={() => signOut()}>
            <FiLogOut />
          </button>
        </div>
      ) : (
        <LoginDiscord />
      )}
      {isWetlisted && (
        <div className="bg-green-200 mx-auto w-fit border border-green-400 rounded-xl mx-4 p-1 px-3 flex items-center">
          You are wetlisted!
        </div>
      )}
      <SuiConnect />
    </div>
  );
};

export default Connection;
