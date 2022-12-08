import Image from "next/image";
export const Header = () => {
  return (
    <section className="relative bg-transparent bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-transparent sm:bg-transparent sm:bg-gradient-to-b sm:from-transparent sm:to-transparent">
        <Image
          priority
          className="-z-50"
          src="/static/images/heroImage.png"
          alt="hero image example"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center"
          }} />
      </div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 sm:flex sm:justify-center lg:h-screen lg:items-center xl:items-end lg:px-8">
        <div className="max-w-xl text-center sm:text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Here Your Adventure
            <strong className="block font-extrabold text-cyan-500">Will Begin.</strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga
            ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
            <a
              href="#"
              className="block w-full rounded bg-cyan-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-cyan-900 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Get Started
            </a>

            <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-cyan-600 shadow hover:text-cyan-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
