// components/Login.js

import { supabase } from '../../utils/supabase';

export default function LoginDiscord() {
  async function signInWithDiscord() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord'
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
