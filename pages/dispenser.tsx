// import { useDispenserStore, useMonkeyStore } from "../store/store";
import { useEffect, useState } from 'react';
import { TEST_ADDRESS } from '../backend/dispenser/config';
// import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import useStoreUserInfo from '../backend/dispenser/useStoreUserInfo';
import supabase from '../utils/supabase';

// pour forcer dynamiquement le refresh des roles par exemple
export const dynamic = 'force-dynamic';

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

  return (
    <>
      <div className="bg-red-700 text-black">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      {/* <h1 className="text-4xl mt-40 text-cyan-500">njr</h1> */}
    </>
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
