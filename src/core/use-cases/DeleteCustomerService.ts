import { ICustomerRepository } from '../repositories/ICustomerRepository';
import { Customer } from '../entities/Customer';

export class DeleteCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(id: string): Promise<void> {
    const customer = await this.customerRepository.findById(id);
    
    if (!customer) {
      throw new Error('Customer not found');
    }

    await this.customerRepository.delete(id);
  }
}