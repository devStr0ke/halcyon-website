import { useMemo } from 'react';
import { useUserStore } from '../../../store/store';
import { Role } from '../../../types/user';

const DiscordRoles = () => {
  const { roles } = useUserStore((state) => state);

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

  return (
    <div className="mb-6 w-full">
      <h2 className="text-2xl text-center font-medium mb-2 uppercase mt-2">Discord Roles</h2>
      <div className="flex justify-center">
        <div className="flex justify-center">
          {nonEnthusiastRoles.map((r: Role) => (
            <div
              key={r.role}
              className={`${r.claimed ? 'bg-neutral-300' : 'bg-yellow-300'} border ${
                r.claimed ? 'border-neutral-400' : 'border-yellow-500'
              } rounded-xl mx-2 p-1 px-3`}>
              {r.role}
            </div>
          ))}
          {enthusiastRoles.map((r: Role) => (
            <div
              key={r.role}
              className={`${r.claimed ? 'bg-neutral-300' : 'bg-purple-300'} border ${
                r.claimed ? 'border-neutral-400' : 'border-purple-400'
              } rounded-xl mx-2 p-1 px-3`}>
              {r.role}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2">
          {`You can claim ${nonEnthClaimableNumber} filled bottle${
            nonEnthClaimableNumber > 1 ? 's' : ''
          } and ${enthClaimableNumber} empty bottle${enthClaimableNumber > 1 ? 's' : ''}`}
      </div>
    </div>
  );
};

export default DiscordRoles;
