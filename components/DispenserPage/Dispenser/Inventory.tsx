import { useMemo } from 'react';
import { useDispenserStore } from '../../../store/dispenserStore';
import { useUserStore } from '../../../store/userStore';
import { useWalletKit } from '@mysten/wallet-kit';
import useAuth from '../../../backend/supabase/useAuth';
import { Role } from '../../../types/user';

const Inventory = () => {
  const { filledBottleIds, emptyBottleIds, ticketIds, status, suiBalance, testCoinBalance, roles } = useUserStore((state) => state);
  const { currentAccount } = useWalletKit();
  const { session } = useAuth();
  const { testCoin } = useDispenserStore((state) => state);

  const nonEnthusiastRoles = useMemo(() => roles.filter((r) => r.enthusiast === false), [roles]);
  const nonEnthClaimableNumber = useMemo(
    () => nonEnthusiastRoles.filter((r) => !r.claimed).length,
    [nonEnthusiastRoles]
  );
  const enthusiastRoles = useMemo(() => roles.filter((r) => r.enthusiast === true), [roles]);
  const enthClaimableNumber = useMemo(
    () => enthusiastRoles.filter((r) => !r.claimed).length,
    [enthusiastRoles]
  );

  return  status === 'loading' ? (
    <div className="animate-pulse flex space-x-4 mt-12">
      <div className="flex-col w-full space-y-6 py-1 mb-5">
        <div className="mx-auto h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="mx-auto h-3 bg-gray-200 rounded w-4/6"></div>
        <div className="mx-auto h-3 bg-gray-200 rounded w-3/6"></div>
        <div className="mx-auto h-3 bg-gray-200 rounded w-2/6"></div>
        <div className="mx-auto h-3 bg-gray-200 rounded w-1/6"></div>
      </div>
    </div>
  ) : session && currentAccount !== null && status === 'succeeded' ? (
    <div className='flex justify-center lg:mt-8 xl:mt-6'>
      <div className="mb-4 mt-4 bg-red flex flex-col justify-center bg-cyan-50 border-cyan-500 rounded-2xl p-4 w-full">
        <p className='lg:text-lg xl:text-2xl text-center font-medium'>INVENTORY</p>
        <div className='flex justify-center mt-1 mb-1 lg:text-sm xl:text-lg'>
          <div className="text-center flex">
            <p className='text-cyan-500 mr-1'>{(suiBalance/1000000000).toFixed(2)}</p><p> SUI</p><p className='mr-3 ml-3'>-</p>
          </div>
          <div className="text-center flex">
              <p className='text-cyan-500 mr-1'>{(testCoinBalance/1000000000).toFixed(2)}</p><p> {testCoin.generics.split('::').pop()}</p>
          </div>
        </div>
        <div className='flex justify-center lg:text-sm xl:text-lg'>
          <div className="text-center flex">
            <p className='text-cyan-500 mr-1'>{filledBottleIds.length}</p><p> Filled Bottle{filledBottleIds.length > 1 ? 's' : ''}</p><p className='mr-3 ml-3'>-</p>
          </div>
          <div className="text-center flex">
            <p className='text-cyan-500 mr-1'>{emptyBottleIds.length}</p><p> Empty Bottle{emptyBottleIds.length > 1 ? 's' : ''}</p><p className='mr-3 ml-3'>-</p>
          </div>
          <div className="text-center flex">
            <p className='text-cyan-500 mr-1'>{ticketIds.length}</p><p> Voucher{ticketIds.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <button onClick={() => window.scrollTo(0,0)} className='text-cyan-500 hover:text-cyan-600 mt-2'>What to do with all this loot now?</button>
        <div className="w-full">
          <h2 className="lg:text-lg xl:text-2xl text-center font-medium mb-2 uppercase mt-2">Discord Roles</h2>
          <div className="flex justify-center">
            <div className="flex justify-center">
              {nonEnthusiastRoles.map((r: Role) => (
                <div
                  key={r.role}
                  className={`${r.claimed ? 'bg-neutral-300' : 'bg-yellow-300'} border ${
                    r.claimed ? 'border-neutral-400' : 'border-yellow-500'
                  } rounded-xl flex justify-center items-center text-sm w-full text-center mx-1`}>
                  {r.role}
                </div>
              ))}
              {enthusiastRoles.map((r: Role) => (
                <div
                  key={r.role}
                  className={`${r.claimed ? 'bg-neutral-300' : 'bg-purple-300'} border ${
                    r.claimed ? 'border-neutral-400' : 'border-purple-400'
                  } rounded-xl flex justify-center items-center text-sm w-full text-center mx-1`}>
                  {r.role}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-2 lg:text-sm xl:text-lg">
            <div className="text-center flex">
              <p className='text-cyan-500 mr-1'>{nonEnthClaimableNumber}</p>
              <p>Filled Bottle{nonEnthClaimableNumber > 1 ? 's' : ''} to claim</p>
            </div>
            <p className='mr-3 ml-3'>-</p>
            <div className="text-center flex">
              <p className='text-cyan-500 mr-1'>{enthClaimableNumber}</p>
              <p>Empty Bottle{enthClaimableNumber > 1 ? 's' : ''} to claim</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-10 text-center uppercase text-2xl font-light animate-pulse mt-32">
      Connect with both Discord and a Sui Wallet
    </div>
  );
};

export default Inventory;
