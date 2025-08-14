import { ICustomerRepository } from '../repositories/ICustomerRepository';
import { Customer } from '../entities/Customer';

type CustomerProfileResponse = Omit<Customer, 'password'>;

export class GetCustomerProfileService {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(customerId: string): Promise<CustomerProfileResponse> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found.');
    }

    const { password, ...customerProfile } = customer;
    return customerProfile as CustomerProfileResponse;
  }
}