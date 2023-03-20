// import { useDispenserStore, useMonkeyStore } from "../store/store";
import { useEffect, useState } from 'react';
import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { formatAddress } from '@mysten/sui.js';

import { TEST_ADDRESS } from '../backend/dispenser/config';
// import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import useStoreUserInfo from '../backend/dispenser/useStoreUserInfo';
import { default as DispenserComp } from '../components/Dispenser/dispenser';
import supabase from '../utils/supabase';
import LoadingPage from '../components/Loading/LoadingPage';
import dynamic from 'next/dynamic';
import Connect from '../components/Connect/Connect';

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
  const { data } = await supabase.from('halcyon_roles').select();

  return {
    props: {
      data
    }
  };
}

export default function Dispenser({ data }: { data: any }) {
  //   useStoreUserInfo(TEST_ADDRESS);
  console.log(data);

  return (
    <WalletKitProvider>
      <div className="w-screen h-screen py-40 bg-gray-100 flex flex-col items-center justify-between">
        <div className="flex w-full justify-end px-10">
          <Connect />
        </div>

        <div className="w-full flex justify-around">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Left Block</h2>
            <p>Content for the left block goes here.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Right Block</h2>
            <p>Content for the right block goes here.</p>
          </div>
        </div>
      </div>
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
