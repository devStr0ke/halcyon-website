import { useUserStore, useDispenserStore } from '../../../store/store';

const UserStatus = () => {
  const { filledBottleIds, emptyBottleIds, ticketIds, status, suiBalance, testCoinBalance } = useUserStore((state) => state);
  const { testCoin } = useDispenserStore((state) => state);

  return status === 'idle' || status === 'loading' ? (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 w-full space-y-3 py-1 mb-5">
        <div className="mx-auto h-3 bg-gray-200 rounded w-3/5"></div>
        <div className="mx-auto h-3 bg-gray-200 rounded w-2/5"></div>
        <div className="mx-auto h-3 bg-gray-200 rounded w-1/5"></div>
      </div>
    </div>
  ) : (
    <div className='flex justify-center'>
      <div className="mb-4 mt-4 bg-red flex flex-col justify-center bg-cyan-50 border-cyan-500 rounded-2xl p-4 w-full">
        <p className='text-2xl text-center font-medium'>INVENTORY</p>
        <div className='flex justify-center mt-2 mb-2'>
          <div className="text-center flex">
            <p className='text-cyan-500 mr-1'>{(suiBalance/1000000000).toFixed(2)}</p><p> SUI</p><p className='mr-3 ml-3'>-</p>
          </div>
          <div className="text-center flex">
              <p className='text-cyan-500 mr-1'>{(testCoinBalance/1000000000).toFixed(2)}</p><p> {testCoin.generics.split('::').pop()}</p>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className="text-center flex">
            <p className='text-cyan-500 mr-1'>{filledBottleIds.length}</p><p className='uppercase'> Filled Bottle(s)</p><p className='mr-3 ml-3'>-</p>
          </div>
          <div className="text-center flex">
            <p className='text-cyan-500 mr-1'>{emptyBottleIds.length}</p><p className='uppercase'> Empty Bottle(s)</p><p className='mr-3 ml-3'>-</p>
          </div>
          <div className="text-center flex">
            <p className='text-cyan-500 mr-1'>{ticketIds.length}</p><p className='uppercase'> Voucher(s)</p>
          </div>
        </div>
        <button onClick={() => window.scrollTo(0,0)} className='text-cyan-500 hover:text-cyan-600 mt-2'>What to do with all this loot now?</button>
      </div>
    </div>
  );
};

export default UserStatus;
