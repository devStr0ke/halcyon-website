// import { useDispenserStore, useMonkeyStore } from "../store/store";
import { useEffect, useState } from 'react';
import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { formatAddress } from '@mysten/sui.js';

import { TEST_ADDRESS } from '../backend/dispenser/config';
// import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import useStoreUserInfo from '../backend/dispenser/useStoreUserInfo';
import { default as DispenserComp } from '../components/Dispenser/Dispenser';
import supabase from '../utils/supabase';
import LoadingPage from '../components/Loading/LoadingPage';
import dynamic from 'next/dynamic';

// pour forcer dynamiquement le refresh des roles par exemple
//export const dynamic = 'force-dynamic';

const WalletKitProvider = dynamic(
  () => import('@mysten/wallet-kit').then((mod) => mod.WalletKitProvider),
  {
    ssr: false,
    loading: LoadingPage
  }
);

export async function getServerSideProps() {
  let { data: halcyon_roles, error } = await supabase.from('halcyon_roles').select('*');

  console.log('data', halcyon_roles);
  console.log('error', error);

  if (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        data: null
      }
    };
  }

  return {
    props: {
      halcyon_roles
    }
  };
}

export default function Dispenser({ data }: { data: any }) {
  //   useStoreUserInfo(TEST_ADDRESS);

  return (
    <WalletKitProvider>
      <DispenserComp />
    </WalletKitProvider>
  );
}

// /client-side => useEffect
/*
const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('halcyon_roles').select();
      console.log({ data, error });
      setData(data);
    };

    getData();
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
*/
// / server-rendered => getServerSideProps
// /static-generation => getStaticProps
// /static-generation => getStaticProps
// /static-with-revalidation => getStaticProps with revaldiate
