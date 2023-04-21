import { useWalletKit } from '@mysten/wallet-kit';
import { useRef, useEffect } from 'react';

// import useGetDispenserInfo from '../backend/dispenser/useGetDispenserInfo';
import useGetConfig from '../backend/dispenser/useGetConfig';
import useGetUserInfo from '../backend/dispenser/useGetUserInfo';
import useGetDispenserInfo from '../backend/dispenser/useGetDispenserInfo';
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
  const { currentAccount } = useWalletKit();
  useGetConfig('testnet');
  useGetDispenserInfo();
  const dispenser = useDispenserStore();  
  useGetUserInfo(currentAccount?.address, dispenser);
  const user = useUserStore();
  console.log("USER STORE: ", user);
  console.log("DISPENSER STORE: ", dispenser);

  const opacityTitle = useRef(null);
  const opacityArrow = useRef(null);
  const blurBackground = useRef(null);
  const dispenserRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
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

  const handleWelcomeClick = () => {
    (dispenserRef.current as any).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Welcome onClick={handleWelcomeClick} opacityTitle={opacityTitle} opacityArrow={opacityArrow} />
      <Dispenser dispenserRef={dispenserRef} blurBackground={blurBackground} />
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
