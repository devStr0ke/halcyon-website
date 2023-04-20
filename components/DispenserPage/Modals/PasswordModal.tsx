import { usePasswordModalStore } from '../../../store/transactionStore';
import useHandleInteractions from '../../../backend/dispenser/useHandleInteractions';

function PasswordModal() {
  const { setShowPasswordModal, setPasswordInput, passwordInput } = usePasswordModalStore((state) => state);
  const { handleSubmit } = useHandleInteractions()

  return (
    <div className='absolute inset-0 flex items-center justify-center z-[998]'>
      <div className="relative h-42 w-96 bg-white rounded-lg drop-shadow-lg z-[999] p-2">
        <div className="flex items-center justify-center text-center text-black font-bold text-xl">
          Enter password to access private batch :
        </div>
        <form className='p-2 flex-col' onSubmit={handleSubmit}>
          <input
            type="password"
            value={passwordInput}
            className="border border-gray-500 p-1 rounded-lg w-full"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button
            className="bg-red-500 text-white w-[48%] py-1 rounded-lg hover:bg-red-600 mt-2 mr-1 font-bold"
            onClick={() => setShowPasswordModal(false)}
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-cyan-600 text-white w-[48%] py-1 rounded-lg hover:bg-cyan-700 mt-2 ml-1 font-bold"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-[998]" />
    </div>
  );
}

export default PasswordModal;
