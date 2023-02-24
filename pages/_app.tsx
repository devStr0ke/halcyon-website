import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/NavBar/Navbar';
import { Footer } from '../components/Footer/Footer';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <div id='contacts'>
        <Footer />
      </div>
    </>
  );
}
