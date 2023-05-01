import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getCurrentUser, getReservations } from '@/actions';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const currentUser = await getCurrentUser(req, res);

  const reservations = await getReservations({
    authorId: currentUser?.id as string,
  });

  return {
    props: { currentUser, reservations },
  };
};

const Reservations: FC = ({
  currentUser,
  reservations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <>
      <Head>
        <title>Airbnb | Reservations</title>
      </Head>
      <Container>
        <Heading title="Reservations" subtitle="Bookings on your properties" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Reservations;
