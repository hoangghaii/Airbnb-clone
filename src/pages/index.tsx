import { Nunito } from 'next/font/google';
import Head from 'next/head';

import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import Navbar from '@/components/navbar/Navbar';
import ToasterProvider from '@/providers/ToasterProvider';

const font = Nunito({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Airbnb</title>
        <meta
          name="description"
          content="Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences"
        />
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <main className={`${font.className}`}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar />
      </main>
    </>
  );
}