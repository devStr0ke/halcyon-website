import { PACKAGE_ID, provider } from './config';
import { useUserStore } from '../../store/store';
import { NftClient } from '@originbyte/js-sdk';
import { BCS, getSuiMoveConfig, BcsWriter } from '@mysten/bcs';
import { useEffect } from 'react';
import { parseDynamicDomains, NftClient as NClient, ArtNft } from '../../originbyte-js-sdk/src';
import { DispenserStore } from '../../types/suiDispenser';

// hook permettant de fetch et store avec Zustand
// toutes les infos liées à l'utilisateur
// pour y accéder:
//
// import { useUserStore } from "./store/store"
// const coinObjectId = useUserStore((state) => state.coinObjectId);

const bcs = new BCS(getSuiMoveConfig());
const client = new NftClient();

const computeMagicNumber = (addr: string): number => {
  let bcsWriter: BcsWriter = bcs.ser(BCS.ADDRESS, addr);
  let bytes: Uint8Array = bcsWriter.toBytes();
  return bytes[30] * bytes[31];
};

const getNftsForAddress = async (addr: string) => {
  const nclient = new NClient(); 
  const nfts = await nclient.getNftsForAddress(addr);
  return nfts;
};

const filterFilledIds = async (nfts: ArtNft[]): Promise<string[]> => {
  const filtered = nfts.filter((nft) => {
    if (nft.collectionPackageObjectId == PACKAGE_ID && nft.name == 'Filled Bottle') {
      return nft;
    }
  });
  const mapped = filtered.map((nft) => nft.id);
  return mapped;
};

const filterEmptyIds = async (nfts: ArtNft[]): Promise<string[]> => {
  const filtered = nfts.filter((nft) => {
    if (nft.collectionPackageObjectId == PACKAGE_ID && nft.name == 'Empty Bottle') {
      return nft;
    }
  });
  const mapped = filtered.map((nft) => nft.id);
  return mapped;
};

const filterTicketIds = async (nfts: ArtNft[], dispenser: DispenserStore): Promise<string[]> => {
  const filtered = nfts.filter((nft) => {
    if (nft.collectionPackageObjectId == dispenser.testNft.packageId && nft.name == dispenser.testNftName) {
      return nft;
    }
  });
  const mapped = filtered.map((nft) => nft.id);
  return mapped;
};

const getTestCoinIds = async (addr: string, dispenser: DispenserStore) => {
  const testCoins = await provider.getCoins({
    owner: addr,
    coinType: `0x${dispenser.testCoin.generics}`,
  });
  const testCoinIds = testCoins.data.map((coin) => coin.coinObjectId);
  return testCoinIds;
};

const useStoreUserInfo = (address: string | null, dispenser: DispenserStore) => {
  const {setUser, setLoading} = useUserStore((state) => state);

  useEffect(() => {
    const fetchStoreUserInfo = async (addr: string, dispenser: DispenserStore) => {
      try {
        setLoading(true);
        if (dispenser.testCoin.generics) {
          
          const magicNumber = computeMagicNumber(addr);
          const nfts = await getNftsForAddress(addr);
          const filledBottleIds = await filterFilledIds(nfts);
          const emptyBottleIds = await filterEmptyIds(nfts);
          const ticketIds = await filterTicketIds(nfts, dispenser);
          const testCoinIds = await getTestCoinIds(addr, dispenser);
          
          setUser({
            address: addr,
            magicNumber,
            testCoinIds,
            filledBottleIds,
            emptyBottleIds,
            ticketIds,
          });
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchStoreUserInfo(address, dispenser);
    }
  }, [address, setUser, dispenser, setLoading]);
};

export default useStoreUserInfo;
