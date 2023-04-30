import { NextApiRequest, NextApiResponse } from 'next';

import { getCurrentUser } from '@/actions';
import { prisma } from '@/libs';

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    await POST(request, response);
  }

  if (request.method === 'DELETE') {
    await DELETE(request, response);
  }
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
  const { listingId } = request.query;

  try {
    if (!listingId || typeof listingId !== 'string') {
      return response.status(500).json({ message: 'Invalid ID' });
    }

    const currentUser = await getCurrentUser(request, response);

    if (!currentUser) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
}

async function DELETE(request: NextApiRequest, response: NextApiResponse) {
  const { listingId } = request.query;

  try {
    if (!listingId || typeof listingId !== 'string') {
      return response.status(500).json({ message: 'Invalid ID' });
    }

    const currentUser = await getCurrentUser(request, response);

    if (!currentUser) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((favoriteId) => favoriteId !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
}
