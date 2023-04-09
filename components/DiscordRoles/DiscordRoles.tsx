import { useUserStore } from '../../store/store';

const DiscordRoles = () => {
  const { roles } = useUserStore((state) => state);

  return (
    <div className="mb-6 w-full">
      <h2 className="text-center mb-3">Discord Roles</h2>
      <div className="w-full flex justify-between">
        <div className="flex justify-between">
          {roles
            .filter((r) => r.enthusiast === false)
            .map((r) => (
              <div
                key={r.role}
                className={`bg-cyan-${
                  r.claimed ? '300' : '100'
                } border border-cyan-400 rounded-xl mx-2 p-1 px-3`}>
                {r.role}
              </div>
            ))}
          {roles
            .filter((r) => r.enthusiast === true)
            .map((r) => (
              <div
                key={r.role}
                className={`bg-purple-${
                  r.claimed ? '300' : '100'
                } border border-purple-400 rounded-xl mx-2 p-1 px-3`}>
                {r.role}
              </div>
            ))}
        </div>

        <div className="flex">
          {`You can claim ${roles.filter((r) => r.enthusiast === false).length} filled bottle(s)
    and ${roles.filter((r) => r.enthusiast === true).length} empty bottle(s)`}
        </div>
      </div>
    </div>
  );
};

export default DiscordRoles;
