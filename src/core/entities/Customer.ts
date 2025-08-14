import { randomUUID } from 'crypto';

export class Customer {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;

constructor(props: Omit<Customer, 'id'>, id?: string) {
  this.id = id ?? randomUUID();
  this.name = props.name;
  this.email = props.email;
  this.password = props.password;
  this.createdAt = props.createdAt ?? new Date();
  this.updatedAt = props.updatedAt ?? new Date();
}
}