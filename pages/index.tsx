import { Navbar } from '../components/NavBar/Navbar';
import { Header } from '../components/Header/Header';
import { Separator } from '../components/Separator/Separator';
import { First } from '../components/Content/First';
import { Footer } from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Separator subtitle="Lorem Ipsum Dolores Jeremy Favelas" title='Overview' />
      <First />
      <Footer />
    </>
  );
}
