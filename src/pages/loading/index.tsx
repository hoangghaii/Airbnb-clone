import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { getCurrentUser } from '@/actions';
import Loader from '@/components/Loader';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const currentUser = await getCurrentUser(req, res);

  return {
    props: { currentUser },
  };
};

const Loading: FC = () => {
  return <Loader />;
};

export default Loading;
