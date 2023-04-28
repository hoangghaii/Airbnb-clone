import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { FC } from 'react';

import { getCurrentUser, getListingById } from '@/actions';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const currentUser = await getCurrentUser(req, res);
  const listing = await getListingById(query.slug as string);

  return {
    props: { currentUser, listing },
  };
};

const ListingDetail: FC = ({
  currentUser,
  listing,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log({ currentUser, listing });

  return <div>ListingDetail</div>;
};

export default ListingDetail;
