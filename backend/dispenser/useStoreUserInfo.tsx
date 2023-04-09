import { useConfigStore, useUserStore } from '../../store/store';
// import { NftClient } from '@originbyte/js-sdk';
import { BCS, getSuiMoveConfig, BcsWriter } from '@mysten/bcs';
import { useEffect } from 'react';
import { NftClient as NClient, ArtNft } from '../../originbyte-js-sdk/src';
import { DispenserStore } from '../../types/suiDispenser';
import { getIsWetlisted, getRoleUpdatesForUser } from '../../utils/supabase';
import useAuth from '../../hooks/useAuth';
import { Role } from '../../types/suiUser';

// hook permettant de fetch et store avec Zustand
// toutes les infos liées à l'utilisateur
// pour y accéder:
//
// import { useUserStore } from "./store/store"
// const coinObjectId = useUserStore((state) => state.coinObjectId);
const useStoreUserInfo = (address: string | undefined, dispenser: DispenserStore) => {
  const bcs = new BCS(getSuiMoveConfig());
  //const client = new NftClient();
  const { setUser, status, setStatus } = useUserStore((state) => state);
  const config = useConfigStore();

  const { session } = useAuth();

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
      if (nft.collectionPackageObjectId == config.package_id && nft.name == 'Filled Bottle') {
        return nft;
      }
    });
    const mapped = filtered.map((nft) => nft.id);
    return mapped;
  };

  const filterEmptyIds = async (nfts: ArtNft[]): Promise<string[]> => {
    const filtered = nfts.filter((nft) => {
      if (nft.collectionPackageObjectId == config.package_id && nft.name == 'Empty Bottle') {
        return nft;
      }
    });
    const mapped = filtered.map((nft) => nft.id);
    return mapped;
  };

  const filterTicketIds = async (nfts: ArtNft[], dispenser: DispenserStore): Promise<string[]> => {
    const filtered = nfts.filter((nft) => {
      if (
        nft.collectionPackageObjectId == `0x${dispenser.testNft.generics.substring(0, 64)}` &&
        nft.name == dispenser.testNftName
      ) {
        return nft;
      }
    });

    const mapped = filtered.map((nft) => nft.id);
    return mapped;
  };

  const getTestCoinIds = async (addr: string, dispenser: DispenserStore) => {
    const testCoins = await config.provider.getCoins({
      owner: addr,
      coinType: `0x${dispenser.testCoin.generics}`
    });
    const testCoinIds = testCoins.data.map((coin) => coin.coinObjectId);
    return testCoinIds;
  };

  useEffect(() => {
    const fetchStoreUserInfo = async (addr: string, dispenser: DispenserStore) => {
      try {
        console.log('start fetching');
        setStatus('loading');
        if (dispenser.testCoin.generics) {
          const magicNumber = computeMagicNumber(addr);
          const nfts = await getNftsForAddress(addr);
          const filledBottleIds = await filterFilledIds(nfts);
          const emptyBottleIds = await filterEmptyIds(nfts);
          const ticketIds = await filterTicketIds(nfts, dispenser);
          const testCoinIds = await getTestCoinIds(addr, dispenser);

          let roles: Role[] = [];
          let isWetlisted = null;

          if (session) {
            if (session.user.identities)
              roles = await getRoleUpdatesForUser(session.user.identities[0].id);
            isWetlisted = await getIsWetlisted(session.user.id);
          } else {
            console.log('session not');
          }

          setUser({
            address: addr,
            magicNumber,
            testCoinIds,
            filledBottleIds,
            emptyBottleIds,
            ticketIds,
            roles,
            isWetlisted
          });
        }
      } catch (error) {
        console.error(error);
        setStatus('failed');
      } finally {
        setStatus('succeeded');
        console.log('end fetching');
      }
    };

    if (address && status === 'succeeded') {
      console.log(address);
      console.log(dispenser);
      fetchStoreUserInfo(address, dispenser);
    }
  }, [address, setUser, dispenser]);
};

export default useStoreUserInfo;
