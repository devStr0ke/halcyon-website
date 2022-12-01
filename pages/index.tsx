import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../components/NavBar/Navbar";


export default function Home() {
  return (
    <>
      <div className="-z-10 relative w-full h-[100vh]">
        <div className="-z-10">
          <Image
            priority
            src="/static/images/heroImage.png"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="hero image example"
          />
        </div>
      </div>
      <div className="mt-96 mb-96">Hello</div>
    </>
  )
}
