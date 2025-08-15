import { IFavoriteRepository } from "../repositories/IFavoriteRepository";

type RemoveFavoriteRequest = {
  customerId: string;
  productId: number;
}

export class RemoveFavoriteService {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  async execute({ customerId, productId }: RemoveFavoriteRequest): Promise<void> {
    const favorite = await this.favoriteRepository.findByCustomerIdAndProductId(customerId, productId);
    
    if (!favorite) {
      throw new Error("Favorite not found");
    }

    await this.favoriteRepository.deleteByCustomerIdAndProductId(customerId, productId);
  }
}