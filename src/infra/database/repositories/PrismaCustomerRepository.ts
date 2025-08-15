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

  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });
    
    return customer ? new Customer(customer) : null;
  }

  async update(customerData: { id: string; name?: string; email?: string; password?: string }): Promise<Customer> {
    const customer = await prisma.customer.update({
      where: { id: customerData.id },
      data: {
        name: customerData.name,
        email: customerData.email,
        password: customerData.password,
      },
    });

    return new Customer(customer);
  }

  async delete(id: string): Promise<void> {
    await prisma.customer.delete({
      where: { id },
    });
  }
}