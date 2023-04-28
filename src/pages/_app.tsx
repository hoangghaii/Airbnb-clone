import type { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';
import Head from 'next/head';

import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import RentModal from '@/components/modals/RentModal';
import Navbar from '@/components/navbar/Navbar';
import ToasterProvider from '@/providers/ToasterProvider';
import '@/styles/globals.css';

const font = Nunito({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => {
  const currentUser = pageProps.currentUser || null;

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
        <RentModal />
        <Navbar currentUser={currentUser} />
      </main>
      <div className="pb-20 pt-28">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;

App.getInitialProps = async (appctx: { ctx: any; Component?: any }) => {
  const { ctx, Component } = appctx;

  const appProps = { showActions: false };

  if (Component.getServerSideProps) {
    Object.assign(appProps, await Component.getServerSideProps(ctx));
  }

  return { Component, pageProps: { ...appProps } };
};
