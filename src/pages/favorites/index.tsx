import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { FC } from 'react';

import { getCurrentUser, getFavoriteListings } from '@/actions';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const currentUser = await getCurrentUser(req, res);
  const favoriteListings = await getFavoriteListings(req, res);

  return {
    props: { currentUser, favoriteListings },
  };
};

const Favorites: FC = ({
  currentUser,
  favoriteListings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!favoriteListings || favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <>
      <Head>
        <title>Airbnb | Favorites</title>
      </Head>
      <Container>
        <Heading title="Favorites" subtitle="List of places you favorited!" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {favoriteListings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Favorites;
