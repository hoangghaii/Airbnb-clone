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

const Trips: FC = () => {
  return (
    <>
      <Head>
        <title>Airbnb | Trips</title>
      </Head>
      <div>Trips</div>
    </>
  );
};

export default Trips;
