import { useWalletKit } from '@mysten/wallet-kit';

// import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import useStoreUserInfo from '../backend/dispenser/useStoreUserInfo';
import DispenserComp from '../components/Dispenser/Dispenser';
import { supabase } from '../utils/supabase';
import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import { useUserStore, useDispenserStore } from '../store/store';
import useStoreConfig from '../backend/dispenser/useStoreConfig';

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

export default function Dispenser() {
  useStoreConfig('testnet');
  const { currentAccount } = useWalletKit();
  useStoreContractInfo();
  const dispenser = useDispenserStore();  
  useStoreUserInfo(currentAccount?.address, dispenser);
  const user = useUserStore();
  console.log("USER STORE: ", user);
  console.log("DISPENSER STORE: ", dispenser);

  return <DispenserComp />;
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
