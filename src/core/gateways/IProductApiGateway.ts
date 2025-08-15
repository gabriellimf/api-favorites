export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  review?: {
    rate: number;
    count: number;
  }
}

export interface IProductApiGateway {
  findById(productId: number): Promise<Product | null>;
}