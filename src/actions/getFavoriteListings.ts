import { prisma } from '@/libs';

import { getCurrentUser } from './getCurrentUser';

export const getFavoriteListings = async (req: any, res: any) => {
  try {
    const currentUser = await getCurrentUser(req, res);

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
};
