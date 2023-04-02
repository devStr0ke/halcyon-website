import { provider, DISPENSER, MONKEY } from './config';
import { useDispenserStore, useMonkeyStore } from '../../store/store';
import { useEffect } from 'react';

// fetch 2 objets Sui contenant des infos sur le smart contract
// parse ces infos puis les store avec Zustand
// pour y accéder:
//
// import { useDispenserStore } from ".store/store.ts"
// const active = useDispenserStore((state) => state.active);

const useStoreContractInfo = async () => {
  const setDispenser = useDispenserStore((state) => state.setDispenser);
  const setMonkey = useMonkeyStore((state) => state.setMonkey);

  useEffect(() => {
    const fetchStoreContractInfo = async () => {
      const batch = await provider.multiGetObjects({
        ids: [DISPENSER],
        options: { showContent: true, showType: true, showOwner: true }
      });
      console.log(batch);

      setDispenser((batch[0] as any).details.data?.fields);
      setMonkey((batch[1] as any).details.data?.fields);
    };

    fetchStoreContractInfo();
  }, [setDispenser, setMonkey]);
};

export default useStoreContractInfo;
