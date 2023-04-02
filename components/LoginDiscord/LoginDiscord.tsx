// components/Login.js

import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabase';

export default function LoginDiscord() {
  const router = useRouter();

  async function signInWithDiscord() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={signInWithDiscord}>
        Login with Discord
      </button>
    </div>
  );
}
