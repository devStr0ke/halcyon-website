import Image from 'next/image';

const Welcome = (props: any) => {
  return (
    <div>
      <div className="absolute top-0 h-[100vh] w-full z-30 flex justify-center">
        <div ref={props.opacityArrow} className="flex items-end py-4 text-red-500">
          <Image
            src="/static/svg/double-arrow-black.svg"
            className="animate-bounce hover:w-[45px]"
            alt="doubleArrow"
            width="40"
            height="100"
          />
        </div>
      </div>
      <div className="absolute top-0 h-[100vh] w-full z-30 flex justify-center">
        <div ref={props.opacityTitle} className="flex items-center py-5">
          <div className="mx-auto px-4 py-20 lg:flex lg:h-screen lg:items-end">
            <div className="mx-auto text-center">
              <h1 className="saira text-black text-lg font-extrabold sm:text-3xl">
                Welcome To The Bottle Dispenser!
              </h1>
              <div className="lg:mx-8 p-6 mt-4 bg-gray-200 rounded-lg">
                <p className="saira sm:text-md sm:leading-relaxed text-black">
                  The Dispenser is a gamified on-chain whitelisting tool allowing Sui community
                  members to get tokenized Wetlists in the form of Bottles NFTs for our Thirsty
                  Monkeys collection.
                </p>
                <p className="saira sm:text-md sm:leading-relaxed text-black">
                  Get a Filled Bottle and burn it to register your Wetlist. Many mechanisms have
                  been implemented to allow everyone to get Bottles!
                </p>
                <strong className="text-lg sm:text-2xl font-bold mt-1 block text-black">
                  <p>How does it works?</p>
                </strong>
                <p className="saira sm:text-md sm:leading-relaxed text-black">
                  Wait for a batch to open and buy random bottles with $SUI
                  <br />
                  Recycle five empty bottles to get a free entry
                  <br />
                  Win a Voucher during a Mint Event and swap it for a filled bottle
                  <br />
                  Participate in an IDO Event to get coins and buy random bottles
                  <br />
                  Earn a Thirsty or Wetlist role on Discord to claim a filled bottle
                  <br />
                  Win Enthusiast roles on Discord to claim random bottles <br />
                </p>
                <p className="saira sm:text-md sm:leading-relaxed text-black">
                  Read more{' '}
                  <a
                    className="text-cyan-600"
                    href="https://medium.com/@HalcyonBuilders/one-small-step-for-halcyon-one-giant-leap-for-web3-330064894efb">
                    in this article
                  </a>{' '}
                  and join us{' '}
                  <a className="text-cyan-600" href="https://discord.gg/ZbQ3TPbzPT">
                    on Discord
                  </a>
                </p>
                <strong className="text-lg sm:text-2xl font-bold mt-1 block text-black">
                  <p>What to do with the Loot?</p>
                </strong>
                <p className="saira sm:text-md sm:leading-relaxed text-black">
                  $SUI and Coins issued by our partners may be used during a batch to buy random
                  bottles. There is no limit per wallet.
                  <br />
                  If you have a Filled Bottle, well done! Burn it to register your Wetlist.
                  <br />
                  Recycle (burn) 5 empty bottles to get a new random bottle at any time. Get as
                  many bottles as possible during the batches and recycle the empty ones
                  afterwards, without hurrying!
                  <br />
                  You have won a Voucher during a Mint Event and it is now in your wallet? Swap it
                  for a Filled Bottle and register your Wetlist!
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
