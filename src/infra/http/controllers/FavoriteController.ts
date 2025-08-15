import { Request, Response } from 'express';
import { AddFavoriteService } from '../../../core/use-cases/AddFavoriteService';
import { ListFavoritesService } from '../../../core/use-cases/ListFavoritesService';
import { RemoveFavoriteService } from '../../../core/use-cases/RemoveFavoriteService';

export class FavoriteController {
  constructor(
    private addFavoriteService: AddFavoriteService,
    private listFavoritesService: ListFavoritesService,
    private removeFavoriteService: RemoveFavoriteService
  ) {}

  async add(request: Request, response: Response): Promise<Response> {
    const { productId } = request.body;
    const customerId = request.user.id;

    try {
      const favorite = await this.addFavoriteService.execute({ customerId, productId });
      return response.status(201).json(favorite);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    const customerId = request.user.id;

    try {
      const products = await this.listFavoritesService.execute(customerId);
      return response.status(200).json(products);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;
    const customerId = request.user.id;

    try {
      await this.removeFavoriteService.execute({ customerId, productId: Number(productId) });
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}