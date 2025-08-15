import { IProductApiGateway, Product } from "../../core/gateways/IProductApiGateway";
import axios from 'axios';

export class FakeStoreApiGateway implements IProductApiGateway {
  
  async findById(productId: number): Promise<Product | null> {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
      return response.data as Product;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }
}