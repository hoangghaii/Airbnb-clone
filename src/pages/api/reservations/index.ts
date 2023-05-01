import { NextApiRequest, NextApiResponse } from 'next';

import { getCurrentUser } from '@/actions';
import { prisma } from '@/libs';
import { ReservationRequestBody } from '@/types';

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    await POST(request, response);
  }
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body as unknown as ReservationRequestBody;

  const { totalPrice, startDate, endDate, listingId } = body;

  try {
    const currentUser = await getCurrentUser(request, response);

    if (!currentUser) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return response.status(401).json({ message: 'Error value!' });
    }

    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return response.status(200).json(listingAndReservation);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
}
