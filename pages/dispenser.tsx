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
      <div className="w-screen h-screen py-40 bg-gray-100 flex flex-col items-center justify-start">
        <div className="text-red-600 pb-12">
          Beware, the obtained NFTs live on Sui devnet, which is frequently reset. This will make
          you lose your entire wallet! So remember to register your wetlist ASAP.
        </div>

        <div className="w-full flex justify-around">
          <div className="bg-white p-6 rounded-lg shadow-md w-2/5 h-96 flex flex-col justify-between">
            <h2 className="text-2xl font-bold text-center">Dispenser Drawing</h2>
            <div className="w-full grid grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Buy
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Recycle
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Swap
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Claim
              </button>
            </div>
          </div>

          <div className="w-2/5">
            <div className="flex flex-col justify-between px-10">
              <p>Current/Upcoming Batch: </p>
              <p className="text-center">X Bottles Availabe</p>
              <p className="text-center">Y Bottles Minted</p>
              <p className="text-center">Z Filled Minted</p>
            </div>
            <div className="flex w-full justify-between px-10">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Connect Discord
              </button>
              <Connect />
            </div>
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
