import { ICustomerRepository } from '../repositories/ICustomerRepository';
import { Customer } from '../entities/Customer';
import { hash } from 'bcrypt';

export class CreateCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

async execute({ name, email, password }: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findByEmail(email);
    if (existingCustomer) {
      throw new Error('Customer with this email already exists.');
    }

    const hashedPassword = await hash(password, 10);

    const newCustomer = await this.customerRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    return newCustomer;
  }
}