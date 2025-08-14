import { ICustomerRepository } from '../repositories/ICustomerRepository';
import { hash } from 'bcrypt';
import { Customer } from '../entities/Customer';

type UpdateRequest = {
  customerId: string;
  data: {
    name?: string;
    email?: string;
    password?: string;
  };
};

type UpdateResponse = Omit<Customer, 'password'>;

export class UpdateCustomerProfileService {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({ customerId, data }: UpdateRequest): Promise<UpdateResponse> {
    const customer = await this.customerRepository.findById(customerId);
    
    if (!customer) {
      throw new Error('Customer not found');
    }

    if (data.email) {
      const existingCustomer = await this.customerRepository.findByEmail(data.email);
      if (existingCustomer && existingCustomer.id !== customerId) {
        throw new Error('Email already in use');
      }
    }

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    const updatedCustomer = await this.customerRepository.update({
      id: customerId,
      ...data,
    });

    return {
      id: updatedCustomer.id,
      name: updatedCustomer.name,
      email: updatedCustomer.email,
      createdAt: updatedCustomer.createdAt,
      updatedAt: updatedCustomer.updatedAt,
    };
  }
}