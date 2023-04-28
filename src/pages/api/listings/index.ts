import { NextApiRequest, NextApiResponse } from 'next';

import { getCurrentUser } from '@/actions';
import { prisma } from '@/libs';
import { ListingRequestBody } from '@/types';

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    await POST(request, response);
  }
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body as unknown as ListingRequestBody;

  const {
    location,
    category,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  try {
    const currentUser = await getCurrentUser(request, response);

    if (!currentUser) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        userId: currentUser.id,
        price: parseInt(price, 10),
      },
    });

    return response.status(200).json(listing);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
}
