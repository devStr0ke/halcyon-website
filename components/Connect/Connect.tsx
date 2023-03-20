import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import React, { useState } from 'react';

const Connect = () => {
  const { currentAccount, disconnect } = useWalletKit();

  return (
    <div className="">
      {currentAccount ? (
        <div className="flex items-center">
          <div className="mr-10">{currentAccount}</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => disconnect()}>
            Disconnect
          </button>
        </div>
      ) : (
        <ConnectButton connectText={'Connect Wallet'} />
      )}
    </div>
  );
};

export default Connect;
