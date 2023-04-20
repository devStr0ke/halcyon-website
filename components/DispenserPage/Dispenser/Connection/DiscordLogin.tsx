import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';

import useAuth, { signOut } from '../../../../backend/supabase/useAuth';
import { supabase } from '../../../../backend/supabase/supabase';

export default function DiscordLogin() {
  const { session } = useAuth();

  async function signInWithDiscord() {
    const redirectUrl = 'http://localhost:3000/dispenser/';
    // const redirectUrl = 'https://delightful-tartufo-d58047.netlify.app/dispenser/';
    //const redirectUrl = 'https://halcyon.builders/dispenser/';

    try {
      await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: { redirectTo: redirectUrl }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
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
          <div className='mr-1'>
            <button
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 w-full rounded"
              onClick={signInWithDiscord}>
              Login with Discord
            </button>
          </div>
        )}
    </div>
  );
}
