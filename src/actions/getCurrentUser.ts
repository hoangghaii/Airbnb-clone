import { getServerSession } from 'next-auth/next';

import { prisma } from '@/libs';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const getSession = async (req: any, res: any) => {
  return await getServerSession(req as any, res as any, authOptions);
};

export const getCurrentUser = async (req: any, res: any) => {
  try {
    const session = await getSession(req, res);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
};
