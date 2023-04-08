import { useState, Fragment } from 'react';
import { Config } from '../../types/config';
import { updateIsWetlisted, updateRoleClaimed } from '../../utils/supabase';
import useAuth from '../../hooks/useAuth';
import { useUserStore } from '../../store/store';

export const useHandleResult = () => {
  const { session } = useAuth();
  const { updateRoleClaimStatus, setIsWetlisted, addBottle } = useUserStore((state) => state);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

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
          setShowModal(true);
        } else {
          if (receivedEvent.parsedJson.is_filled) {
            console.log('Filled Bottle Received!');
            setModalContent('Filled Bottle Received!');
          } else {
            console.log('Empty Bottle Received!');
            setModalContent('Empty Bottle Received!');
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
          } else {
            console.log('Empty Bottle Received!');
            setModalContent('Empty Bottle Received!');
            console.log('receivedEvent.parsedJson', receivedEvent.parsedJson);
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

  const closeModal = () => {
    setShowModal(false);
  };

  const Modal = () => (
    <>
      <div
        className={`absolute inset-0 flex items-center justify-center z-[998] ${
          showModal ? 'block' : 'hidden'
        }`}>
        <div className="bg-white p-6 rounded shadow-xl w-56 z-[999]">
          <p className="text-sm">{modalContent}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => closeModal()}>
            Close Modal
          </button>
        </div>
        <div className="absolute inset-0 bg-black opacity-50 z-[998]" />
      </div>
    </>
  );

  return { handleResult, handleResultClaimFromDiscord, Modal };
};
