'use client'

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RootLayout ({children,} : {children: React.ReactNode}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  

  const signUp = () => {
    supabase.auth.signUp({
      email: "jhon@supabase.com",
      password: "Test326E"})
  };

  const signIn = () => {
    supabase.auth.signInWithPassword({
      email: "jhon@supabase.com",
      password: "Test326E"})
  };

  const signOut = () => {
    supabase.auth.signOut()
  };

  return (
    <>
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </>
  )
}