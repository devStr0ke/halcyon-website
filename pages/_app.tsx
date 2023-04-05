import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/NavBar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingPage from '../components/Loading/LoadingPage';

export default function App({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionContextProvider>
  );
}
