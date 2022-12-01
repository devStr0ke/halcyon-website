import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../components/NavBar/Navbar";


export default function Home() {
  return (
    <>
      <div className="overflow-hidden">
        <Image
          priority
          className="-z-50"
          src="/static/images/heroImage.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="hero image example"
        />
        <div className='z-10 flex h-screen justify-center items-center gap-11'>
          <Link href="/about">
            <div className="text-3xl hover:text-blue-500">Go to about page</div>
          </Link>
          <Link href="/about">
            <div className="text-3xl hover:text-blue-500">Go to about page</div>
          </Link>
        </div>
      </div>
    </>
  )
}
