import { ICustomerRepository } from "../../../core/repositories/ICustomerRepository";
import { Customer } from "../../../core/entities/Customer.ts";
import { prisma } from "../prisma/Prisma.ts";

export class PrismaCustomerRepository implements ICustomerRepository {
  
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: { email },
    });
    
    return customer ? new Customer(customer) : null;
  }

  async save(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    const customer = await prisma.customer.create({
      data: {
        ...customerData
      }
    });

    return new Customer(customer);
  }
}