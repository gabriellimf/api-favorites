import { Customer } from "../entities/Customer.ts";

type CustomerCreateData = {
  name: string;
  email: string;
  password: string;
}

type CustomerUpdateData = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface ICustomerRepository {
  findByEmail(email: string): Promise<Customer | null>;
  save(customerData: CustomerCreateData): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  update(customerData: CustomerUpdateData): Promise<Customer>;
}