import { Favorite } from "../entities/Favorites";

type FavoriteCreateData = {
  customerId: string;
  productId: number;
}

export interface IFavoriteRepository {
  findByCustomerIdAndProductId(customerId: string, productId: number): Promise<Favorite | null>;
  findByCustomerId(customerId: string): Promise<Favorite[]>;
  save(favoriteData: FavoriteCreateData): Promise<Favorite>;
  deleteByCustomerIdAndProductId(customerId: string, productId: number): Promise<void>;
}