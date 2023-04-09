import { useConfigStore, useDispenserStore } from '../../store/store';
import { useEffect } from 'react';

// fetch 2 objets Sui contenant des infos sur le smart contract
// parse ces infos puis les store avec Zustand
// pour y accéder:
//
// import { useDispenserStore } from ".store/store.ts"
// const active = useDispenserStore((state) => state.active);

const useStoreContractInfo = async () => {
  const { setDispenser, setLoading } = useDispenserStore((state) => state);
  const config = useConfigStore();

  useEffect(() => {
    const fetchStoreContractInfo = async () => {
      try {
        setLoading(true);
        console.log('befoooooore');
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
          testNftName: dispenser.test_nft_name,
          testCoin: {
            packageId: dispenser.test_coin.fields.package_id,
            moduleName: dispenser.test_coin.fields.module_name,
            structName: dispenser.test_coin.fields.struct_name,
            generics: dispenser.test_coin.fields.generics[0]
          },
          mintCap: dispenser.mint_cap.fields.id.id
        });
        console.log('afteeeeer');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreContractInfo();
  }, [setDispenser, setLoading, config]);
};

export default useStoreContractInfo;
