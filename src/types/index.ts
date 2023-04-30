import { Listing, Reservation, User } from '@prisma/client';
// eslint-disable-next-line no-unused-vars
import { type } from 'os';

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type RegisterBody = {
  email: string;
  name: string;
  password: string;
};

export type ListingRequestBody = {
  location: {
    flag: string;
    label: string;
    value: string;
    region: string;
    latlng: number[];
  };
  category: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: string;
  title: string;
  description: string;
};

export type ReservationRequestBody = {
  totalPrice: number;
  startDate: string;
  endDate: string;
  listingId: string;
};
