import { useModalStore } from '../../../store/transactionStore';
import { AiOutlineClose } from 'react-icons/ai';

function ResultModal() {
  const { modalContent, isBottleFilled, setShowModal } = useModalStore((state) => state);

  const displayImage = () => {
    if (isBottleFilled === null)
      return (
        <div className="rounded-t-2xl z-0 h-64 w-72 bg-no-repeat bg-cover bg-[url('/static/images/modal/wetlisted.jpg')]"></div>
      );
    else {
      if (isBottleFilled)
        return (
          <div className="rounded-t-2xl z-0 h-64 w-72 bg-no-repeat bg-cover bg-[url('/static/images/modal/filledBottle.png')]"></div>
        );
      return (
        <div className="rounded-t-2xl z-0 h-64 w-72 bg-no-repeat bg-cover bg-[url('/static/images/modal/emptyBottle.png')]"></div>
      );
    }
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center z-[998]`}>
      <div className="relative h-80 w-fit bg-white rounded-2xl drop-shadow-lg z-[999]">
        {displayImage()}
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center text-black font-bold text-xl">
          {modalContent}
        </div>
        <button
          className="absolute top-0 right-4 bg-slate-600 hover:bg-slate-700 text-white font-bold p-1 rounded-full mt-4"
          onClick={() => setShowModal(false)}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-[998]" />
    </div>
  );
}

export default ResultModal;
