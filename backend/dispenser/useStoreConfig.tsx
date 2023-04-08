import { devnetConfig } from './config.devnet';
import { testnetConfig } from './config.testnet';
import { useConfigStore } from '../../store/store';
import { useEffect } from 'react';

// fetch 2 objets Sui contenant des infos sur le smart contract
// parse ces infos puis les store avec Zustand
// pour y accéder:
//
// import { useDispenserStore } from ".store/store.ts"
// const active = useDispenserStore((state) => state.active);

const useStoreConfig = (net: "devnet" | "testnet") => {
  const {setConfig} = useConfigStore((state) => state);

  useEffect(() => {
    const config = net === "devnet" ? devnetConfig : testnetConfig; 
    setConfig(config)
  }, [setConfig, net]);
};

export default useStoreConfig;
