import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { Faq } from '../Faq/Faq';

export const Fifth = () => {

  return (
    <>
      <div className="relative h-[100vh] w-full px-2 bg-transparent">
        <Faq
          title='What Is Halcyon?'
          text='Halcyon is a cross-chain Web3 Development Studio creating innovative products like gamified collectibles, dapps and protocols. We focus on building highly reliable and efficient tools for builders and their community. We are first starting on the Move Ecosystem because it is a young and very promising space.'
        />
        <div className='h-[10px] w-full'></div>
        <Faq
          title='What is Thirsty Monkeys ?' 
          text="Thirsty Monkeys will be one of the first products powered by Halcyon. It is purely a profile picture NFT collection, but unlike the others, these monkeys will offer holders exclusive and significant advantages on products built by Halcyon.

          We chose to launch this collection on Sui because that's the blockchain we chose to build our first products on. In addition, we have designed an innovative gamified whitelisting process that should allow anyone to get their NFT!"
        />
        <div className='h-[10px] w-full'></div>
        <Faq
          title='How will the sales work ?'
          text='The pre-sale will be followed by the public sale, both of which will take place on Sui. Numerous bottle editions will be distributed to grant pre-sale access to their holders. These can be earned in a variety of ways on our custom dApp. We call it the Bottle Dispenser.

          Then at Sui mainnet launch, all filled bottle holders will be able to participate in Thirsty Monkeys presale. The rest of the supply will be made available at the main sale right after.'
        />
        <div className='h-[10px] w-full'></div>
        <Faq
          title='What is the Bottle Dispenser?'
          text='The Bottle Dispenser is a system that allows users to obtain whitelists for a sale on a first-come, first-served basis through a Dapp. Users can mint and receive two types of bottles, filled ones which are eligible for a whitelist and unfilled ones which can be recycled for a new entry. Partner projects may give away filled bottles and there may be opportunities to obtain them through test mints on partner marketplaces where winning NFTs can be redeemed for a whitelist.'
        />
        <div className='h-[10px] w-full'></div>
        <Faq
          title='What are we building?'
          text='Our first product "The Cantina" will be a hub for DAO, open to builders and their communities. Projects will be able to create their own space including a staking and governance module. This will allow builders to avoid wasting time developing already popular dapps and focus on producing new concepts and utilities within their projects.
          The Cantina will be improved with many other features before moving forward to our next product: “The Fair”.'
        />
      </div>
    </>
  );
};
