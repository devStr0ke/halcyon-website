import { useConfigStore, useUserStore } from '../../store/store';
import { BCS, getSuiMoveConfig, BcsWriter } from '@mysten/bcs';
import { useEffect } from 'react';
import { DispenserStore, Nft } from '../../types/sui';
import { getIsWetlisted, getRoleUpdatesForUser } from '../../utils/supabase';
import useAuth from '../../hooks/useAuth';
import { Role } from '../../types/user';
import { PaginatedObjectsResponse } from '@mysten/sui.js';

// hook permettant de fetch et store avec Zustand
// toutes les infos liées à l'utilisateur
// pour y accéder:
//
// import { useUserStore } from "./store/store"
// const coinObjectId = useUserStore((state) => state.coinObjectId);

const NFT_REGEX =
  /^(0x[a-f0-9]{63,64})::([a-zA-Z]{1,})::([a-zA-Z]{1,})$/;

const useStoreUserInfo = (address: string | undefined, dispenser: DispenserStore) => {
  const bcs = new BCS(getSuiMoveConfig());
  const { setUser, status, setStatus } = useUserStore((state) => state);
  const config = useConfigStore();
  console.log(status);
  

  const { session } = useAuth();

  const computeMagicNumber = (addr: string): number => {
    let bcsWriter: BcsWriter = bcs.ser(BCS.ADDRESS, addr);
    let bytes: Uint8Array = bcsWriter.toBytes();
    return bytes[30] * bytes[31];
  };

  const getNftsForAddress = async (addr: string): Promise<any> => {
    const objects = await config.provider.getOwnedObjects({ owner: addr, options: {showType: true} });
    const nfts = objects.data
      .filter((_) => _.data?.type?.match(NFT_REGEX));
    
    console.log(nfts);
    
    return nfts;
  };

  const filterFilledIds = async (nfts: Nft[]): Promise<string[]> => {
    const filtered = nfts.filter((nft) => {
      if (nft.data.type == `${config.package_id}::bottles::FilledBottle`) {
        return nft;
      }
    });
    const mapped = filtered.map((nft) => nft.data.objectId);
    return mapped;
  };

  const filterEmptyIds = async (nfts: Nft[]): Promise<string[]> => {
    const filtered = nfts.filter((nft) => {
      if (nft.data.type == `${config.package_id}::bottles::EmptyBottle`) {
        return nft;
      }
    });
    const mapped = filtered.map((nft) => nft.data.objectId);
    return mapped;
  };

  const filterTicketIds = async (nfts: Nft[], dispenser: DispenserStore): Promise<string[]> => {
    const filtered = nfts.filter((nft) => {
      if (nft.data.type == `${dispenser.testNft.packageId}::${dispenser.testNft.moduleName}::${dispenser.testNft.structName}`) {
        return nft;
      }
    });

    const mapped = filtered.map((nft) => nft.data.objectId);
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

    if (address && dispenser.status === 'succeeded') {
      console.log(address);
      console.log(dispenser);
      fetchStoreUserInfo(address, dispenser);
    }
  }, [address, setUser, dispenser]);
};

export default useStoreUserInfo;
