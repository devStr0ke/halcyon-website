import { useWalletKit } from '@mysten/wallet-kit';
import { useRef, useEffect } from 'react';

// import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import useStoreConfig from '../backend/dispenser/useStoreConfig';
import useStoreUserInfo from '../backend/dispenser/useStoreUserInfo';
import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import { supabase } from '../backend/supabase/supabase';

import { useDispenserStore } from '../store/dispenserStore';
import { useUserStore } from '../store/userStore';

import Dispenser from '../components/DispenserPage/Dispenser';
import Welcome from '../components/DispenserPage/Welcome';

// pour forcer dynamiquement le refresh des roles par exemple
//export const dynamic = 'force-dynamic';

export async function getServerSideProps() {
  let { data: role_updates, error } = await supabase.from('role_updates').select('*');

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
      role_updates
    }
  };
}

export default function DispenserDapp() {
  useStoreConfig('testnet');
  const { currentAccount } = useWalletKit();
  useStoreContractInfo();
  const dispenser = useDispenserStore();  
  useStoreUserInfo(currentAccount?.address, dispenser);
  const user = useUserStore();
  console.log("USER STORE: ", user);
  console.log("DISPENSER STORE: ", dispenser);

  const opacityBlur = useRef(null);
  const opacityTitle = useRef(null);
  const opacityArrow = useRef(null);
  const blurBackground = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // @ts-ignore
      opacityBlur.current.style.opacity = +scrollTop / 1000;
      // @ts-ignore
      opacityTitle.current.style.opacity = 1 - scrollTop / 300;
      // @ts-ignore
      opacityArrow.current.style.opacity = 1 - scrollTop / 300;
      // @ts-ignore
      blurBackground.current.style.filter = `blur(${scrollTop / 70}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Welcome opacityTitle={opacityTitle} opacityArrow={opacityArrow} />
      <Dispenser opacityBlur={opacityBlur} blurBackground={blurBackground} />
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
