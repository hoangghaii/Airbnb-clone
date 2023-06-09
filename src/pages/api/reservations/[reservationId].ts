import { NextApiRequest, NextApiResponse } from 'next';

import { getCurrentUser } from '@/actions';
import { prisma } from '@/libs';

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'DELETE') {
    await DELETE(request, response);
  }
}

async function DELETE(request: NextApiRequest, response: NextApiResponse) {
  try {
    const currentUser = await getCurrentUser(request, response);

    if (!currentUser) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    const { reservationId } = request.query;

    if (!reservationId || typeof reservationId !== 'string') {
      return response.status(401).json({ message: 'Invalid ID' });
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return response.status(200).json(reservation);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
}
