import { IFavoriteRepository } from "../../../core/repositories/IFavoriteRepository.ts";
import { Favorite } from "../../../core/entities/Favorites.ts";
import { prisma } from "../prisma/Prisma.ts";

export class PrismaFavoriteRepository implements IFavoriteRepository {
  
  async findByCustomerIdAndProductId(customerId: string, productId: number): Promise<Favorite | null> {
    const favorite = await prisma.favorite.findUnique({
      where: {
        customerId_productId: {
          customerId,
          productId,
        },
      },
    });

    return favorite ? new Favorite(favorite) : null;
  }

  async save(favoriteData: { customerId: string; productId: number }): Promise<Favorite> {
    const favorite = await prisma.favorite.create({
      data: favoriteData,
    });

    return new Favorite(favorite);
  }

  async findByCustomerId(customerId: string): Promise<Favorite[]> {
    const favorites = await prisma.favorite.findMany({
      where: { customerId },
    });
    
    return favorites.map(favorite => new Favorite(favorite));
  }

  async deleteByCustomerIdAndProductId(customerId: string, productId: number): Promise<void> {
    await prisma.favorite.delete({
      where: {
        customerId_productId: {
          customerId,
          productId,
        },
      },
    });
  }
}