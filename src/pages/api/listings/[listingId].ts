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

    const { listingId } = request.query;

    if (!listingId || typeof listingId !== 'string') {
      return response.status(401).json({ message: 'Invalid ID' });
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return response.status(200).json(listing);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
}
