import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
export const First = () => {
  const element = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        }
      });
    });

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      if (element.current) {
        observer.unobserve(element.current);
      }
    };
  }, []);

  if (!isAnimated) {
    return (
      <>
        <div className="relative h-[300vh] w-full">
          <div
            ref={element}
            className="z-10 animate-starBackground"
            style={{
              height: '0.5px',
              width: '0.5px',
              top: '50%',
              left: '50%',
              backgroundColor: '#fff',
              position: 'sticky',
              borderRadius: '50%',
              boxShadow:
                '4vw -25vh 1px 0px #fff,9vw -32vh 0px 0px #fff,20vw -26vh 0px 1px #fff,-9vw 38vh 0px 0px #fff,33vw -46vh 1px 1px #fff,16vw 4vh 1px 0px #fff,7vw -32vh 1px 1px #fff,-2vw 24vh 0px 1px #fff,-34vw 34vh 1px 0px #fff,-20vw 38vh 0px 0px #fff,35vw -36vh 0px 1px #fff,-10vw 35vh 1px 1px #fff,-30vw -14vh 0px 1px #fff,43vw 6vh 1px 1px #fff,-23vw 25vh 1px 1px #fff,7vw -42vh 0px 1px #fff,37vw 40vh 1px 1px #fff,23vw 38vh 0px 1px #fff,-49vw -18vh 0px 1px #fff,-50vw -30vh 1px 1px #fff,-27vw -46vh 1px 1px #fff,-15vw 32vh 0px 1px #fff,-36vw 10vh 0px 1px #fff,24vw 2vh 1px 1px #fff,-48vw -24vh 1px 0px #fff,-25vw -13vh 1px 0px #fff,-26vw -35vh 0px 0px #fff,26vw -47vh 1px 0px #fff,11vw 2vh 0px 0px #fff,27vw -37vh 1px 1px #fff,-45vw 21vh 1px 0px #fff,-24vw 20vh 0px 0px #fff,-48vw -44vh 0px 1px #fff,2vw 36vh 0px 1px #fff,40vw 1vh 1px 0px #fff,-46vw -16vh 1px 0px #fff,23vw 24vh 0px 1px #fff,22vw -19vh 0px 0px #fff,41vw -35vh 1px 1px #fff,-24vw 16vh 0px 1px #fff,-14vw 10vh 1px 1px #fff,-43vw -25vh 1px 1px #fff,-34vw 34vh 0px 1px #fff,-7vw 26vh 1px 0px #fff,32vw 31vh 1px 0px #fff,5vw -23vh 0px 1px #fff,-35vw 19vh 0px 0px #fff,-3vw 17vh 1px 0px #fff,35vw 32vh 1px 1px #fff,34vw 39vh 1px 0px #fff,19vw 43vh 0px 0px #fff,21vw 29vh 0px 0px #fff,-28vw 45vh 1px 0px #fff,-39vw -39vh 0px 0px #fff,-40vw 38vh 1px 1px #fff,40vw -40vh 1px 0px #fff,3vw -15vh 0px 0px #fff,-27vw -50vh 0px 0px #fff,24vw 47vh 0px 1px #fff,-12vw -36vh 1px 0px #fff,45vw 42vh 1px 0px #fff,-43vw 50vh 1px 1px #fff,47vw -19vh 1px 1px #fff,18vw 38vh 0px 1px #fff,10vw 32vh 1px 0px #fff,-1vw 21vh 1px 0px #fff,-35vw 21vh 1px 0px #fff,34vw 44vh 0px 0px #fff,-46vw -50vh 0px 0px #fff,19vw 26vh 1px 1px #fff,-50vw -9vh 1px 1px #fff,27vw 43vh 0px 1px #fff,20vw -43vh 1px 1px #fff,32vw -49vh 0px 0px #fff,-36vw 37vh 1px 0px #fff,-22vw 9vh 0px 1px #fff,-6vw 18vh 0px 1px #fff,-33vw 12vh 0px 1px #fff,34vw -48vh 0px 1px #fff,11vw 21vh 0px 0px #fff,-20vw -6vh 0px 1px #fff,1vw -13vh 1px 1px #fff,-10vw 22vh 1px 1px #fff,32vw -44vh 0px 0px #fff,-2vw -43vh 0px 1px #fff,31vw -15vh 1px 1px #fff,0vw -23vh 1px 0px #fff,25vw 7vh 0px 0px #fff,20vw 18vh 0px 1px #fff,35vw -11vh 0px 1px #fff,-40vw -9vh 1px 1px #fff,50vw -46vh 0px 0px #fff,28vw 17vh 0px 0px #fff,-22vw 34vh 0px 0px #fff,26vw 7vh 0px 0px #fff,9vw 30vh 0px 0px #fff,22vw 18vh 1px 0px #fff,8vw -15vh 0px 0px #fff,22vw -8vh 1px 0px #fff,39vw 31vh 1px 1px #fff'
            }}
          ></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative h-[300vh] w-full">
        <div
          ref={element}
          className="z-10 animate-starBackground"
          style={{
            height: '0.5px',
            width: '0.5px',
            top: '50%',
            left: '50%',
            backgroundColor: '#fff',
            position: 'sticky',
            borderRadius: '50%',
            boxShadow:
              '4vw -25vh 1px 0px #fff,9vw -32vh 0px 0px #fff,20vw -26vh 0px 1px #fff,-9vw 38vh 0px 0px #fff,33vw -46vh 1px 1px #fff,16vw 4vh 1px 0px #fff,7vw -32vh 1px 1px #fff,-2vw 24vh 0px 1px #fff,-34vw 34vh 1px 0px #fff,-20vw 38vh 0px 0px #fff,35vw -36vh 0px 1px #fff,-10vw 35vh 1px 1px #fff,-30vw -14vh 0px 1px #fff,43vw 6vh 1px 1px #fff,-23vw 25vh 1px 1px #fff,7vw -42vh 0px 1px #fff,37vw 40vh 1px 1px #fff,23vw 38vh 0px 1px #fff,-49vw -18vh 0px 1px #fff,-50vw -30vh 1px 1px #fff,-27vw -46vh 1px 1px #fff,-15vw 32vh 0px 1px #fff,-36vw 10vh 0px 1px #fff,24vw 2vh 1px 1px #fff,-48vw -24vh 1px 0px #fff,-25vw -13vh 1px 0px #fff,-26vw -35vh 0px 0px #fff,26vw -47vh 1px 0px #fff,11vw 2vh 0px 0px #fff,27vw -37vh 1px 1px #fff,-45vw 21vh 1px 0px #fff,-24vw 20vh 0px 0px #fff,-48vw -44vh 0px 1px #fff,2vw 36vh 0px 1px #fff,40vw 1vh 1px 0px #fff,-46vw -16vh 1px 0px #fff,23vw 24vh 0px 1px #fff,22vw -19vh 0px 0px #fff,41vw -35vh 1px 1px #fff,-24vw 16vh 0px 1px #fff,-14vw 10vh 1px 1px #fff,-43vw -25vh 1px 1px #fff,-34vw 34vh 0px 1px #fff,-7vw 26vh 1px 0px #fff,32vw 31vh 1px 0px #fff,5vw -23vh 0px 1px #fff,-35vw 19vh 0px 0px #fff,-3vw 17vh 1px 0px #fff,35vw 32vh 1px 1px #fff,34vw 39vh 1px 0px #fff,19vw 43vh 0px 0px #fff,21vw 29vh 0px 0px #fff,-28vw 45vh 1px 0px #fff,-39vw -39vh 0px 0px #fff,-40vw 38vh 1px 1px #fff,40vw -40vh 1px 0px #fff,3vw -15vh 0px 0px #fff,-27vw -50vh 0px 0px #fff,24vw 47vh 0px 1px #fff,-12vw -36vh 1px 0px #fff,45vw 42vh 1px 0px #fff,-43vw 50vh 1px 1px #fff,47vw -19vh 1px 1px #fff,18vw 38vh 0px 1px #fff,10vw 32vh 1px 0px #fff,-1vw 21vh 1px 0px #fff,-35vw 21vh 1px 0px #fff,34vw 44vh 0px 0px #fff,-46vw -50vh 0px 0px #fff,19vw 26vh 1px 1px #fff,-50vw -9vh 1px 1px #fff,27vw 43vh 0px 1px #fff,20vw -43vh 1px 1px #fff,32vw -49vh 0px 0px #fff,-36vw 37vh 1px 0px #fff,-22vw 9vh 0px 1px #fff,-6vw 18vh 0px 1px #fff,-33vw 12vh 0px 1px #fff,34vw -48vh 0px 1px #fff,11vw 21vh 0px 0px #fff,-20vw -6vh 0px 1px #fff,1vw -13vh 1px 1px #fff,-10vw 22vh 1px 1px #fff,32vw -44vh 0px 0px #fff,-2vw -43vh 0px 1px #fff,31vw -15vh 1px 1px #fff,0vw -23vh 1px 0px #fff,25vw 7vh 0px 0px #fff,20vw 18vh 0px 1px #fff,35vw -11vh 0px 1px #fff,-40vw -9vh 1px 1px #fff,50vw -46vh 0px 0px #fff,28vw 17vh 0px 0px #fff,-22vw 34vh 0px 0px #fff,26vw 7vh 0px 0px #fff,9vw 30vh 0px 0px #fff,22vw 18vh 1px 0px #fff,8vw -15vh 0px 0px #fff,22vw -8vh 1px 0px #fff,39vw 31vh 1px 1px #fff'
          }}
        ></div>
      </div>
    </>
  );
};
