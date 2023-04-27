import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';

import useAuth, { signOut } from '../../../../backend/supabase/useAuth';
import { supabase } from '../../../../backend/supabase/supabase';

export default function DiscordLogin() {
  const { session } = useAuth();

  async function signInWithDiscord() {
    // const redirectUrl = 'http://localhost:3000/dispenser/';
    // const redirectUrl = 'https://delightful-tartufo-d58047.netlify.app/dispenser/';
    const redirectUrl = 'https://halcyon.builders/dispenser/';

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
          <div className="ml-2 h-fit">{session.user.user_metadata.full_name}</div>
          <button
            className="mr-4 rounded-full px-3 py-2 font-bold text-gray-400 hover:text-blue-600"
            onClick={() => signOut()}
          >
            <FiLogOut />
          </button>
        </div>
      ) : (
        <div className="mr-1">
          <button
            className="md:text-md h-[35px] w-full rounded bg-cyan-500 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-600 sm:text-sm"
            onClick={signInWithDiscord}
          >
            Login with Discord
          </button>
        </div>
      )}
    </div>
  );
}
