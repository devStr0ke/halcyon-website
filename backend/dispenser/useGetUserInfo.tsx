import { useConfigStore } from '../../store/dispenserStore';
import { useUserStore } from '../../store/userStore';
import { BCS, getSuiMoveConfig, BcsWriter } from '@mysten/bcs';
import { useEffect } from 'react';
import { DispenserStore, Nft } from '../../types/dispenserTypes';
import { getIsWetlisted, getRoleUpdatesForUser } from '../supabase/supabase';
import useAuth from '../supabase/useAuth';
import { Role } from '../../types/userTypes'

// hook permettant de fetch et store avec Zustand
// toutes les infos liées à l'utilisateur
// pour y accéder:
//
// import { useUserStore } from "./store/store"
// const coinObjectId = useUserStore((state) => state.coinObjectId);

const NFT_REGEX =
  /^(0x[a-f0-9]{63,64})::([a-zA-Z]{1,})::([a-zA-Z]{1,})$/;

const useGetUserInfo = (address: string | undefined, dispenser: DispenserStore) => {
  const bcs = new BCS(getSuiMoveConfig());
  const { setUser, setStatus } = useUserStore((state) => state);
  const config = useConfigStore();

  const { session } = useAuth();

  const computeMagicNumber = (addr: string): number => {
    let bcsWriter: BcsWriter = bcs.ser(BCS.ADDRESS, addr);
    let bytes: Uint8Array = bcsWriter.toBytes();
    return bytes[30] * bytes[31];
  };

  const getNftsForAddress = async (addr: string): Promise<any> => {
    let hasNextPage = true;
    let nextCursor = null;
    let nfts: Nft[] = [];
    
    while (hasNextPage) {
      const objects: any = await config.provider.getOwnedObjects({
        owner: addr,
        cursor: nextCursor,
        options: { showType: true },
      });

      objects.data?.forEach((obj: any) => {
        if (obj.data?.type?.match(NFT_REGEX)) {
          nfts.push(obj);
        }
      });
      hasNextPage = objects.hasNextPage;
      nextCursor = objects.nextCursor;
    }

    return nfts;
  };

  const filterFilledIds = async (nfts: Nft[]): Promise<string[]> => {
    const filtered = nfts.filter((nft) => nft.data.type.match(`${config.package_id}::bottles::FilledBottle`));
    const mapped = filtered.map((nft) => nft.data.objectId);
    return mapped;
  };

  const filterEmptyIds = async (nfts: Nft[]): Promise<string[]> => {
    const filtered = nfts.filter((nft) => nft.data.type.match(`${config.package_id}::bottles::EmptyBottle`));
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

  const getTestCoins = async (addr: string, dispenser: DispenserStore) => {
    // const testCoinsMetadata = await config.provider.getCoinMetadata({
    //   coinType: `0x${dispenser.testCoin.generics}`
    // });
    // const testCoins = await config.provider.getCoins({
    //   owner: addr,
    //   coinType: `0x${dispenser.testCoin.generics}`
    // });

    // let testCoinBalance = 0;
    // testCoins.data.forEach((coin) => {
    //   testCoinBalance += Number(coin.balance)
    // })
    // const testCoinIds = testCoins.data.map((coin) => coin.coinObjectId);
    // const testCoinDecimals = testCoinsMetadata.decimals;

    const testCoinBalance = 0
    const testCoinIds = [""];
    const testCoinDecimals = 7;
    
    return {testCoinIds, testCoinBalance, testCoinDecimals};
  };

  const getSuiBalance = async (addr: string) => {
    const suiBalance = await config.provider.getBalance({
      owner: addr,
    });

    return Number(suiBalance.totalBalance);
  };

  useEffect(() => {
    const fetchStoreUserInfo = async (addr: string, dispenser: DispenserStore) => {
      try {
        setStatus('loading');
        if (dispenser.testCoin.generics) {
          const magicNumber = computeMagicNumber(addr);
          const nfts = await getNftsForAddress(addr);
          const filledBottleIds = await filterFilledIds(nfts);
          const emptyBottleIds = await filterEmptyIds(nfts);
          const ticketIds = await filterTicketIds(nfts, dispenser);
          const { testCoinIds, testCoinBalance, testCoinDecimals } = await getTestCoins(addr, dispenser);
          const suiBalance = await getSuiBalance(addr);

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
            testCoinBalance,
            testCoinDecimals,
            suiBalance,
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
      }
    };

    if (address && dispenser.status === 'succeeded') {
      fetchStoreUserInfo(address, dispenser);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispenser.status, address]);
};

export default useGetUserInfo;
