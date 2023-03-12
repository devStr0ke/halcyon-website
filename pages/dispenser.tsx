// import { useDispenserStore, useMonkeyStore } from "../store/store";
import { createClient } from '@supabase/supabase-js';
import { TEST_ADDRESS } from '../backend/dispenser/config';
// import useStoreContractInfo from '../backend/dispenser/useStoreContractInfo';
import useStoreUserInfo from '../backend/dispenser/useStoreUserInfo';

export default async function Dispenser() {
//   useStoreUserInfo(TEST_ADDRESS);
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const {data : test} = await supabase.from('halcyon_roles').select();
  return <>
    <div className='bg-red-700 text-black'>test</div>
    <h1>{JSON.stringify(test)}</h1>
  {/* <h1 className="text-4xl mt-40 text-cyan-500">njr</h1> */}</>;
}
