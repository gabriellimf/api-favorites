import { IFavoriteRepository } from "../repositories/IFavoriteRepository";
import { IProductApiGateway } from "../gateways/IProductApiGateway";
import { Favorite } from "../entities/Favorites";

type AddFavoriteRequest = {
  customerId: string;
  productId: number;
}

export class AddFavoriteService {
  constructor(
    private favoriteRepository: IFavoriteRepository,
    private productApiGateway: IProductApiGateway
  ) {}

  async execute({ customerId, productId }: AddFavoriteRequest): Promise<Favorite> {
    const product = await this.productApiGateway.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const existingFavorite = await this.favoriteRepository.findByCustomerIdAndProductId(customerId, productId);
    
    if (existingFavorite) {
      throw new Error("Favorite already exists for this customer and product");
    }
    const favoriteData = {
      customerId,
      productId,
    };
    const favorite = await this.favoriteRepository.save(favoriteData);
    return favorite;
  }
}