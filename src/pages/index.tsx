import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { FC } from 'react';

import { getCurrentUser, getListings } from '@/actions';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/listings/ListingCard';
import Categories from '@/components/navbar/Categories';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const currentUser = await getCurrentUser(req, res);
  const listings = await getListings(query);

  return {
    props: { currentUser, listings },
  };
};

const Home: FC = ({
  currentUser,
  listings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (listings.length === 0) {
    return <EmptyState showReset isHomePage />;
  }

  return (
    <>
      <Head>
        <title>Airbnb</title>
      </Head>
      <>
        <Categories />
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing: any) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
        </Container>
      </>
    </>
  );
};

export default Home;
