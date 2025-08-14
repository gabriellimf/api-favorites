import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createCustomerSchema, updateCustomerSchema } from '../validators/customerValidator';
import { authSchema } from '../validators/authValidator';
import { AuthController } from '../controllers/AuthController';
import { AuthenticateCustomerService } from '../../../core/use-cases/AuthenticateCustomerService';
import { PrismaCustomerRepository } from '../../database/repositories/PrismaCustomerRepository';
import { CreateCustomerService } from '../../../core/use-cases/CreateCustomerService';
import { GetCustomerProfileService } from '../../../core/use-cases/GetCustomerProfileService';
import { UpdateCustomerProfileService } from '../../../core/use-cases/UpdateCustomerProfileService';
import { CustomerController } from '../controllers/CustomerController';

const router = Router();

const customerRepository = new PrismaCustomerRepository();
const createCustomerService = new CreateCustomerService(customerRepository);
const updateCustomerProfileService = new UpdateCustomerProfileService(customerRepository);
const getCustomerProfileService = new GetCustomerProfileService(customerRepository);
const customerController = new CustomerController(
  createCustomerService,
  getCustomerProfileService,
  updateCustomerProfileService
);
const authController = new AuthController(
  new AuthenticateCustomerService(customerRepository)
);

router.post('/customers', validate(createCustomerSchema), (request, response) => {
    return customerController.create(request, response);
  }
);

router.post('/login', validate(authSchema), async (request, response) => {
  return authController.handle(request, response);
});

router.get('/profile', authMiddleware, (request, response) => {
  return customerController.getProfile(request, response);
});

router.put('/profile', authMiddleware, validate(updateCustomerSchema), async (request, response) => {
  return customerController.updateProfile(request, response);
});
export { router };