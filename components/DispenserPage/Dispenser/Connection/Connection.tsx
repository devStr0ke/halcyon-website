import DiscordLogin from './DiscordLogin';
import SuiConnect from './SuiConnect';

const Connection = () => {

  return (
    <>
      <div className="flex justify-end w-full h-full">
        <DiscordLogin />
        <SuiConnect />
      </div>
    </>
  );
};

export default Connection;
