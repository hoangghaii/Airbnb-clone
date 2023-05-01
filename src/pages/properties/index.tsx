import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getCurrentUser, getListings } from '@/actions';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const currentUser = await getCurrentUser(req, res);
  const listings = await getListings({ userId: currentUser?.id as string });

  return {
    props: { currentUser, listings },
  };
};

const Properties: FC = ({
  currentUser,
  listings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return (
    <>
      <Head>
        <title>Airbnb | Properties</title>
      </Head>
      <Container>
        <Heading title="Properties" subtitle="List of your properties" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onDelete}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Properties;
