import { useState, Fragment } from 'react';
import { Config } from '../../types/config';
import { updateIsWetlisted } from '../../utils/supabase';
import useAuth from '../../hooks/useAuth';

export const useHandleResult = () => {
  const { session } = useAuth();

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
          // register wl in supabase
          await updateIsWetlisted(session.user.id, true);
          setModalContent('Wetlist Registered');
          setShowModal(true);
        } else if (receivedEvent.parsedJson.is_filled) {
          console.log('Filled Bottle Received!');
          setModalContent('Filled Bottle Received!');
          setShowModal(true);
        } else {
          console.log('Empty Bottle Received!');
          setModalContent('Empty Bottle Received!');
          setShowModal(true);
        }
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    console.log('close');
  };

  const handleOpen = () => {
    setShowModal(!showModal);
  };

  const Modal = () => (
    <>
      <div
        className={`absolute inset-0 flex items-center justify-center z-50 ${
          showModal ? 'block' : 'hidden'
        }`}>
        <div className="bg-white p-6 rounded shadow-xl w-96">
          <h3 className="text-lg font-semibold mb-4">Modal Title</h3>
          <p className="text-sm">{modalContent}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => closeModal()}>
            Close Modal
          </button>
        </div>
      </div>
    </>
  );

  return { handleResult, Modal };
};
