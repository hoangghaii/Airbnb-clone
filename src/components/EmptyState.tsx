import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Categories from '@/components/navbar/Categories';

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  isHomePage?: boolean;
};

const EmptyState: FC<Props> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
  showReset = false,
  isHomePage = false,
}: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Airbnb | Not found</title>
      </Head>
      {isHomePage && <Categories />}
      <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading center title={title} subtitle={subtitle} />
        <div className="w-48 mt-4">
          {showReset && (
            <Button
              outline
              label="Remove all filters"
              onClick={() => router.push('/')}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EmptyState;
