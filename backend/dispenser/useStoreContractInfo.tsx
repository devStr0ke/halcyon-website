import { provider, DISPENSER } from './config';
import { useDispenserStore } from '../../store/store';
import { useEffect } from 'react';

// fetch 2 objets Sui contenant des infos sur le smart contract
// parse ces infos puis les store avec Zustand
// pour y accéder:
//
// import { useDispenserStore } from ".store/store.ts"
// const active = useDispenserStore((state) => state.active);

const useStoreContractInfo = async () => {
  const setDispenser = useDispenserStore((state) => state.setDispenser);

  useEffect(() => {
    const fetchStoreContractInfo = async () => {
      const dispenser = await provider.getObject({
        id: DISPENSER,
        options: { showContent: true }
      });
      console.log("Dispenser obj", (dispenser as any).data?.content.fields);

      setDispenser((dispenser as any).data?.content?.fields);
    };

    fetchStoreContractInfo();
  }, [setDispenser]);
};

export default useStoreContractInfo;
