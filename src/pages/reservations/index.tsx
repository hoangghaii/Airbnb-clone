import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';

import { getCurrentUser } from '@/actions';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const currentUser = await getCurrentUser(req, res);

  return {
    props: { currentUser },
  };
};

const Reservations: FC = () => {
  return (
    <>
      <Head>
        <title>Airbnb | Reservations</title>
      </Head>
      <div>Reservations</div>
    </>
  );
};

export default Reservations;
