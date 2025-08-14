import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createCustomerSchema } from '../validators/createCustomerValidator';
import { authSchema } from '../validators/authValidator';
import { AuthController } from '../controllers/AuthController';
import { AuthenticateCustomerService } from '../../../core/use-cases/AuthenticateCustomerService';
import { PrismaCustomerRepository } from '../../database/repositories/PrismaCustomerRepository';
import { CreateCustomerService } from '../../../core/use-cases/CreateCustomerService';
import { CustomerController } from '../controllers/CustomerController';

const router = Router();

const customerRepository = new PrismaCustomerRepository();
const createCustomerService = new CreateCustomerService(customerRepository);
const customerController = new CustomerController(createCustomerService);
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

export { router };