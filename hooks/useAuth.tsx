// hooks/useAuth.js
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import supabase from '../utils/supabase';

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
  }
}

export default function useAuth() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      let ret = await supabase.auth.getSession();
      setSession(ret.data.session);
    }
    fetchSession();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { session };
}
