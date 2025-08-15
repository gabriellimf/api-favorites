import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createCustomerSchema, updateCustomerSchema } from '../validators/customerValidator';
import { addFavoriteSchema, removeFavoriteSchema } from '../validators/favoriteValidator';
import { authSchema } from '../validators/authValidator';
import { AuthController } from '../controllers/AuthController';
import { AuthenticateCustomerService } from '../../../core/use-cases/AuthenticateCustomerService';
import { PrismaCustomerRepository } from '../../database/repositories/PrismaCustomerRepository';
import { PrismaFavoriteRepository } from '../../database/repositories/PrismaFavoriteRepository';
import { CreateCustomerService } from '../../../core/use-cases/CreateCustomerService';
import { GetCustomerProfileService } from '../../../core/use-cases/GetCustomerProfileService';
import { UpdateCustomerProfileService } from '../../../core/use-cases/UpdateCustomerProfileService';
import { DeleteCustomerService } from '../../../core/use-cases/DeleteCustomerService';
import { CustomerController } from '../controllers/CustomerController';
import { FavoriteController } from '../controllers/FavoriteController';
import { AddFavoriteService } from '../../../core/use-cases/AddFavoriteService';
import { ListFavoritesService } from '../../../core/use-cases/ListFavoritesService';
import { RemoveFavoriteService } from '../../../core/use-cases/RemoveFavoriteService';
import { FakeStoreApiGateway } from '../../gateways/FakeStoreApiGateway';

const router = Router();

const customerRepository = new PrismaCustomerRepository();
const createCustomerService = new CreateCustomerService(customerRepository);
const updateCustomerProfileService = new UpdateCustomerProfileService(customerRepository);
const deleteCustomerService = new DeleteCustomerService(customerRepository);
const getCustomerProfileService = new GetCustomerProfileService(customerRepository);
const customerController = new CustomerController(
  createCustomerService,
  getCustomerProfileService,
  updateCustomerProfileService,
  deleteCustomerService
);
const authController = new AuthController(
  new AuthenticateCustomerService(customerRepository)
);

const fakeStoreApiGateway = new FakeStoreApiGateway();
const favoriteRepository = new PrismaFavoriteRepository();
const addFavoriteService = new AddFavoriteService(favoriteRepository, fakeStoreApiGateway);
const listFavoritesService = new ListFavoritesService(favoriteRepository, fakeStoreApiGateway);
const removeFavoriteService = new RemoveFavoriteService(favoriteRepository);
const favoriteController = new FavoriteController(
  addFavoriteService,
  listFavoritesService,
  removeFavoriteService
);

router.post('/customers', validate(createCustomerSchema), async (request, response) => {
  return customerController.create(request, response);
});

router.post('/login', validate(authSchema), async (request, response) => {
  return authController.handle(request, response);
});

router.get('/profile', authMiddleware, async (request, response) => {
  return customerController.getProfile(request, response);
});

router.put('/profile', authMiddleware, validate(updateCustomerSchema), async (request, response) => {
  return customerController.updateProfile(request, response);
});

router.delete('/profile', authMiddleware, async (request, response) => {
  return customerController.deleteProfile(request, response);
});

router.post('/favorites', authMiddleware, validate(addFavoriteSchema), async (request, response) => {
  return favoriteController.add(request, response);
});

router.get('/favorites', authMiddleware, async (request, response) => {
  return favoriteController.list(request, response);
});

router.delete('/favorites/:productId', authMiddleware, validate(removeFavoriteSchema), async (request, response) => {
    return favoriteController.remove(request, response);
  }
);

export { router };