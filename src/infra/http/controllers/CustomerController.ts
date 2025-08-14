import { Request, Response } from 'express';
import { CreateCustomerService } from '../../../core/use-cases/CreateCustomerService';

export class CustomerController {
  constructor(
    private createCustomerService: CreateCustomerService
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const customer = await this.createCustomerService.execute({ name, email, password });
      return response.status(201).json(customer);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}