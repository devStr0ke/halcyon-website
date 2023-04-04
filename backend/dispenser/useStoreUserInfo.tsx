import { PACKAGE_ID, TEST_COIN_TYPE, TEST_NFT_COLLECTION, provider } from './config';
import { useUserStore } from '../../store/store';
import { NftClient, ArtNft } from '@originbyte/js-sdk';
import { BCS, getSuiMoveConfig, BcsWriter } from '@mysten/bcs';
import { useEffect } from 'react';

// hook permettant de fetch et store avec Zustand
// toutes les infos liées à l'utilisateur
// pour y accéder:
//
// import { useUserStore } from "./store/store"
// const coinObjectId = useUserStore((state) => state.coinObjectId);

const computeMagicNumber = (addr: string): number => {
  const bcs = new BCS(getSuiMoveConfig());
  let bcsWriter: BcsWriter = bcs.ser(BCS.ADDRESS, addr);
  let bytes: Uint8Array = bcsWriter.toBytes();
  return bytes[30] * bytes[31];
};

const getNftsForAddress = async (addr: string): Promise<ArtNft[]> => {
  const client = new NftClient();
  const nfts = await client.getNftsForAddress(addr);
  console.log('nfts', nfts);
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

const filterTicketIds = async (nfts: ArtNft[]): Promise<string[]> => {
  const filtered = nfts.filter((nft) => {
    if (nft.collectionPackageObjectId == TEST_NFT_COLLECTION && nft.name == 'Ticket') {
      return nft;
    }
  });
  const mapped = filtered.map((nft) => nft.id);
  return mapped;
};

const getTestCoins = async (addr: string) => {
  const testCoins = await provider.getCoins({
    owner: addr,
    coinType: TEST_COIN_TYPE,
  });
  const testCoinIds = testCoins.data.map((coin) => coin.coinObjectId);
  return testCoinIds;
};

const useStoreUserInfo = (address: string | null) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchStoreUserInfo = async (addr: string) => {
      const magicNumber = computeMagicNumber(addr);
      const testCoinIds = await getTestCoins(addr);

    //   const nfts = await getNftsForAddress(addr);
    //   const filledBottleIds = await filterFilledIds(nfts);
    //   const emptyBottleIds = await filterEmptyIds(nfts);
    //   const wwMonkeyIds = await filterTicketIds(nfts);

      setUser({
        address: addr,
        magicNumber,
        testCoinIds,
        filledBottleIds: [],
        emptyBottleIds: [],
        ticketIds: []
      });
    };

    if (address) {
      fetchStoreUserInfo(address);
    }
  }, [address]);
};

export default useStoreUserInfo;
