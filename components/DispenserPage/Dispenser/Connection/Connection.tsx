import { useUserStore } from '../../../../store/userStore';
import DiscordLogin from './DiscordLogin';
import SuiConnect from './SuiConnect';

const Connection = () => {
  const { isWetlisted } = useUserStore((state) => state);

  return (
    <>
      <div className="flex justify-end w-full h-full">
        <DiscordLogin />
        <SuiConnect />
      </div>
      {isWetlisted && (
        <div className="bg-green-200 w-full border border-green-400 rounded-md mx-0 p-0 px-3">
          <p className='text-center text-green-700'>Congratulations, you are wetlisted!</p>
        </div>
      )}
    </>
  );
};

export default Connection;
