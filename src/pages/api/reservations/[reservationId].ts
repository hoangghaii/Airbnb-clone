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
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
  const { listingId } = request.query;
}
