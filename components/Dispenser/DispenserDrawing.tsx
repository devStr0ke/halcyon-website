const DispenserDrawing = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full h-96 flex flex-col justify-between">
      <h2 className="text-2xl font-bold text-center">Dispenser Drawing</h2>
      <div className="w-full grid grid-cols-2 gap-4">
        <button
          onClick={() => console.log('buy')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy
        </button>
        <button
          onClick={() => console.log('recycle')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Recycle
        </button>
        <button
          onClick={() => console.log('swap')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Swap
        </button>
        <button
          onClick={() => console.log('claim')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Claim
        </button>
      </div>
    </div>
  );
};

export default DispenserDrawing;
