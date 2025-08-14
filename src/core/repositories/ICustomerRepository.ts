import { Customer } from "../entities/Customer.ts";

type CustomerCreateData = {
  name: string;
  email: string;
  password: string;
}

export interface ICustomerRepository {
  findByEmail(email: string): Promise<Customer | null>;
  save(customerData: CustomerCreateData): Promise<Customer>;
}