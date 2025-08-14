import { Request, Response } from 'express';
import { CreateCustomerService } from '../../../core/use-cases/CreateCustomerService';
import { GetCustomerProfileService } from '../../../core/use-cases/GetCustomerProfileService';
import { UpdateCustomerProfileService } from '../../../core/use-cases/UpdateCustomerProfileService';

export class CustomerController {
  constructor(
    private createCustomerService: CreateCustomerService,
    private getCustomerProfileService: GetCustomerProfileService,
    private updateCustomerProfileService: UpdateCustomerProfileService
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

  async getProfile(request: Request, response: Response): Promise<Response> {
    const customerId = request.user.id;

    try {
      const customerProfile = await this.getCustomerProfileService.execute(customerId);
      return response.status(200).json(customerProfile);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async updateProfile(request: Request, response: Response): Promise<Response> {
    const customerId = request.user.id;
    const { name, email, password } = request.body;

    try {
      const updatedProfile = await this.updateCustomerProfileService.execute({
        customerId,
        data: { name, email, password },
      });
      return response.status(200).json(updatedProfile);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}