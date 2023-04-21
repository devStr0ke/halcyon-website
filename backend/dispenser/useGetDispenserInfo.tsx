import { useConfigStore, useDispenserStore } from '../../store/dispenserStore';
import { useEffect } from 'react';

// fetch 2 objets Sui contenant des infos sur le smart contract
// parse ces infos puis les store avec Zustand
// pour y accéder:
//
// import { useDispenserStore } from ".store/store.ts"
// const active = useDispenserStore((state) => state.active);

const useGetDispenserInfo = async () => {
  const { setDispenser, setStatus } = useDispenserStore((state) => state);
  const config = useConfigStore();

  const fetchAndStoreDispenser = async () => {
    try {
      setStatus('loading');
      const object = await config.provider.getObject({
        id: config.dispenser,
        options: { showContent: true }
      });
      const dispenser = (object as any).data?.content.fields;

      setDispenser({
        active: dispenser.active,
        startTimestamp: dispenser.start_timestamp,
        endTimestamp: dispenser.end_timestamp,
        price: dispenser.price,
        priceInCoins: dispenser.price_in_coins,
        balance: dispenser.balance,
        supply: dispenser.supply,
        left: dispenser.left,
        testNft: {
          packageId: dispenser.test_nft.fields.package_id,
          moduleName: dispenser.test_nft.fields.module_name,
          structName: dispenser.test_nft.fields.struct_name,
          generics: dispenser.test_nft.fields.generics[0]
        },
        testCoin: {
          packageId: dispenser.test_coin.fields.package_id,
          moduleName: dispenser.test_coin.fields.module_name,
          structName: dispenser.test_coin.fields.struct_name,
          generics: dispenser.test_coin.fields.generics[0]
        },
      });
    } catch (error) {
      console.error(error);
      setStatus('failed');
    } finally {
      setStatus('succeeded');
    }
  };

  useEffect(() => {
    fetchAndStoreDispenser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDispenser, config, setStatus]);
};

export default useGetDispenserInfo;
