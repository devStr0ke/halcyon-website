import { Faq } from '../Faq/Faq';

export const Fifth = () => {

  return (
    <>
      <div 
        className="relative h-[100vh] w-full px-2 bg-transparent"
      >
        <Faq
          title='What is Halcyon?'
          text='Halcyon is a Web3 development studio that builds innovative decentralized products on Sui. We focus on providing highly reliable tools and infrastructure to accelerate project development and growth. By creating user-friendly decentralized applications, we aim to connect builders and communities in the most Web3 way possible.'
        />
        <div className='h-[10px] w-full'></div>
        <Faq
          title='What is Thirsty Monkeys ?' 
          text="Thirsty Monkeys will be one of the first products powered by Halcyon. It is purely a profile picture NFT collection, but unlike the others, these monkeys will offer holders exclusive and significant advantages on products built by Halcyon.

          To onboard enthusiasts, we have designed an innovative gamified whitelisting process that should allow anyone to get their NFT!"
        />
        <div className='h-[10px] w-full'></div>
        <Faq
          title='How will the sales work ?'
          text='The pre-sale will be followed by the public sale, both of which will take place on our partner’s launchpad. Numerous bottle editions will be distributed to grant pre-sale access to their holders. These can be earned in a variety of ways on our custom dApp. We call it the Bottle Dispenser.

          Then at Sui mainnet launch, all filled bottle holders will be able to participate in Thirsty Monkeys presale. The rest of the supply will be made available at the public sale right after.'
        />
        <div className='h-[10px] w-full'></div>
        <Faq
          title='What is the Bottle Dispenser?'
          text='The Bottle Dispenser is a product developed by Halcyon to distribute Wetlists for Thirsty Monkeys’ sale. Regularly, on a FCFS basis, you are able to mint and receives two types of bottles on our Dapp. Filled ones are eligible to a whitelist and the others not, but they can be recycled for a new entry anytime!

          If you are not fast enough to mint a bottle, watch our Twitter & Discord. We will also organize Mint & IDO Events on partner launchpads where NFTs and Coins can be redeemed for Bottles on our Dapp.'
        />
        <div className='h-[10px] w-full'></div>
        <Faq
          title='What are we building?'
          text='Our first product “The Bottle Dispenser” is an on-chain gamified whitelisting tool issuing tokenized whitelists in the form of Bottle NFTs. It has been designed to maximize interactions from the community and collaborations with major Sui actors.

          "The Cantina" is a platform aggregating Community Engagement Data and managing decentralized IDs. It is also be a hub for Web3 projects and their communities. Builders will be able to create their own space with turnkey tools such as staking and governance modules.'
        />
      </div>
    </>
  );
};
