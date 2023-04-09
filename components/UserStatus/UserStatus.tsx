import { useUserStore } from '../../store/store';

const UserStatus = () => {
  const { filledBottleIds, emptyBottleIds, ticketIds, loading } = useUserStore((state) => state);

  return loading ? (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 w-full space-y-3 py-1 mb-5">
        <div className="mx-auto h-3 bg-slate-400 rounded w-3/5"></div>
        <div className="mx-auto h-3 bg-slate-400 rounded w-2/5"></div>
        <div className="mx-auto h-3 bg-slate-400 rounded w-1/5"></div>
      </div>
    </div>
  ) : (
    <div className="mb-4">
      <div className="text-center">
        {`You have ${filledBottleIds.length} filled bottles to burn or give to your friends`}
      </div>
      <div className="text-center">
        {`You have ${ticketIds.length} voucher(s) to swap for a filled bottle`}
      </div>
      <div className="text-center">
        {`You have ${emptyBottleIds.length} empty bottles to recycle`}
      </div>
    </div>
  );
};

export default UserStatus;
