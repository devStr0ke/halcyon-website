import React, { useState } from 'react';

const Dispenser = () => {
  const [connected, setConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dispenser</h1>
        <p className="text-xl">
          Connection status:{' '}
          <span className={connected ? 'text-green-500' : 'text-red-500'}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </p>
        <button>Connect Wallet</button>
      </header>

      <div className="w-full max-w-4xl flex justify-around">
        <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
          <h2 className="text-2xl font-bold mb-4">Left Block</h2>
          <p>Content for the left block goes here.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
          <h2 className="text-2xl font-bold mb-4">Right Block</h2>
          <p>Content for the right block goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dispenser;
