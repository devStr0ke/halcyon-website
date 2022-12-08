import '../styles/globals.css'
import { Navbar } from '../components/NavBar/Navbar'
import type { AppProps } from 'next/app'
import Image from "next/image";
import { Roadmap } from '../components/Core/Roadmap/Roadmap';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Roadmap />
    </>
  ) 
}
