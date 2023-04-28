import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/libs';
import { RegisterBody } from '@/types';

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    await POST(request, response);
  }
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body as unknown as RegisterBody;

  const { email, name, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
}
