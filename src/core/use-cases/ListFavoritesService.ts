import { IFavoriteRepository } from "../repositories/IFavoriteRepository";
import { IProductApiGateway, Product } from "../gateways/IProductApiGateway";

export class ListFavoritesService {
  constructor(
    private favoriteRepository: IFavoriteRepository,
    private productApiGateway: IProductApiGateway
  ) {}

  async execute(customerId: string): Promise<Product[]> {
    const favorites = await this.favoriteRepository.findByCustomerId(customerId);
    const productPromises = favorites.map(fav => 
      this.productApiGateway.findById(fav.productId)
    );
    const productsOrNulls = await Promise.all(productPromises);
    const products = productsOrNulls.filter(product => product !== null) as Product[];

    return products;
  }
}