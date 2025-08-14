import { Router } from 'express';
import { PrismaCustomerRepository } from '../../database/repositories/PrismaCustomerRepository';
import { CreateCustomerService } from '../../../core/use-cases/CreateCustomerService';
import { CustomerController } from '../controllers/CustomerController';

const router = Router();

const customerRepository = new PrismaCustomerRepository();
const createCustomerService = new CreateCustomerService(customerRepository);
const customerController = new CustomerController(createCustomerService);

router.post('/customers', (request, response) => {
  return customerController.create(request, response);
});

export { router };