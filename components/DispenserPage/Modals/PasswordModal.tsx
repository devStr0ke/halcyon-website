import { usePasswordModalStore } from '../../../store/userStore';
import { AiOutlineClose } from 'react-icons/ai';

function PasswordModal() {
  const { setShowPasswordModal, setPasswordInput, setHasAlreadyBeenTyped, passwordInput, password } = usePasswordModalStore((state) => state);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (passwordInput === password) {
        alert('Correct password');
        setHasAlreadyBeenTyped(true);
    } else {
        alert('Incorrect password');
    }
  };

  return (
    <div className='absolute inset-0 flex items-center justify-center z-[998]'>
      <div className="relative h-42 w-96 bg-white rounded-lg drop-shadow-lg z-[999] p-2">
        <div className="flex items-center justify-center text-center text-black font-bold text-xl">
          Enter the password to access the closed mint :
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
