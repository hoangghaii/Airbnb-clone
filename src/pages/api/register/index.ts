import bcrypt from 'bcrypt';

import { prisma } from '@/libs';
import { RegisterBody } from '@/types';

export default async function handle(request: Request, response: any) {
  if (request.method === 'POST') {
    await POST(request, response);
  }
}

async function POST(request: Request, response: any) {
  const body = request.body as unknown as RegisterBody;

  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return response.json(user);
}
