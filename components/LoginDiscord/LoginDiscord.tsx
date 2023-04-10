// components/Login.js

import { supabase } from '../../utils/supabase';

export default function LoginDiscord() {
  async function signInWithDiscord() {
    //const redirectUrl = 'http://localhost:3000/dispenser/';
    //const redirectUrl = 'https://delightful-tartufo-d58047.netlify.app/dispenser/';
    const redirectUrl = 'https://halcyon.builders/dispenser/';

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: { redirectTo: redirectUrl }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 w-full rounded"
        onClick={signInWithDiscord}>
        Login with Discord
      </button>
    </div>
  );
}
