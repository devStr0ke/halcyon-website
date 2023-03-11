// import { useDispenserStore, useMonkeyStore } from "../store/store";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { TEST_ADDRESS } from '../backend/dispenser/config';
// import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import useStoreUserInfo from '../backend/dispenser/useStoreUserInfo';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import Home from '.';

function Dispenser({Component, pageProps}:  AppProps<{initialSession: Session,}>) {
    useStoreUserInfo(TEST_ADDRESS);
    const [supabase] = useState(() => createBrowserSupabaseClient())

    return (
        <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
            <h1 className="text-4xl mt-40 text-cyan-500">njr</h1>
            <Home />
        </SessionContextProvider>
    )
}
export default Dispenser;