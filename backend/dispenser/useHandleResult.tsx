import { Config } from '../../types/config';
import { updateIsWetlisted, updateRoleClaimed } from '../../utils/supabase';
import useAuth from '../../hooks/useAuth';
import { useModalStore, useUserStore } from '../../store/store';

export const useHandleResult = () => {
  const { session } = useAuth();
  const { updateRoleClaimStatus, setIsWetlisted, addBottle } = useUserStore((state) => state);

  const { setModalContent, setShowModal, setIsBottleFilled } = useModalStore((state) => state);

  const handleResult = async (result: any, config: Config) => {
    if (!result) {
      console.log('Tx canceled');
    } else {
      if (result.effects.status.status !== 'success') {
        // Show error
        console.log(`https://explorer.sui.io/txblock/${result.digest}?network=${config.net}`);
      } else {
        const registeredEvent = result.events.find(
          (evt: any) => evt.type === `${config.package_id}::bottles::AddressRegistered`
        );

        const receivedEvent = result.events.find(
          (evt: any) => evt.type === `${config.package_id}::bottles::RandomReceived`
        );
        if (registeredEvent && session) {
          console.log('Wetlist Registered');
          // Register wl in supabase
          await updateIsWetlisted(session.user.id, true);
          // Update local state
          setIsWetlisted();

          setModalContent('Wetlist Registered');
          setIsBottleFilled(null);
          setShowModal(true);
        } else {
          if (receivedEvent.parsedJson.is_filled) {
            console.log('Filled Bottle Received');
            setModalContent('Filled Bottle Received!');
            setIsBottleFilled(true);
          } else {
            console.log('Empty Bottle Received');
            setModalContent('Empty Bottle Received!');
            setIsBottleFilled(false);
          }
          // Update local state
          addBottle(receivedEvent.parsedJson);
          setShowModal(true);
        }
      }
    }
  };

  const handleResultClaimFromDiscord = async (result: any, config: Config, role: string) => {
    if (!result) {
      console.log('Tx canceled');
    } else {
      if (result.effects.status.status !== 'success') {
        // Show error
        console.log(`https://explorer.sui.io/txblock/${result.digest}?network=${config.net}`);
      } else {
        const receivedEvent = result.events.find(
          (evt: any) => evt.type === `${config.package_id}::bottles::RandomReceived`
        );
        if (session) {
          if (receivedEvent.parsedJson.is_filled) {
            console.log('Filled Bottle Received!');
            setModalContent('Filled Bottle Received!');
            setIsBottleFilled(true);
          } else {
            console.log('Empty Bottle Received!');
            setModalContent('Empty Bottle Received!');
            setIsBottleFilled(false);
          }
          // Update local state
          addBottle(receivedEvent.parsedJson);
          setShowModal(true);

          // Change roles in db
          if (session.user.identities) await updateRoleClaimed(session.user.identities[0].id, role);
          // Update local state
          updateRoleClaimStatus(role);
        }
      }
    }
  };

  return { handleResult, handleResultClaimFromDiscord };
};
