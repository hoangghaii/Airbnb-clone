import Head from 'next/head';
import { FC, useEffect } from 'react';

import EmptyState from '@/components/EmptyState';

type Props = {
  error: Error;
};

const Error: FC<Props> = ({ error }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Head>
        <title>Airbnb | Something went error</title>
      </Head>
      <EmptyState title="Uh Oh" subtitle="Something went wrong!" />
    </>
  );
};

export default Error;
