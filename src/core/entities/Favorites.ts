import { randomUUID } from 'crypto';

export class Favorite {
  public readonly id: string;
  public customerId: string;
  public productId: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: Omit<Favorite, 'id'>, id?: string) {
    this.id = id ?? randomUUID();
    this.customerId = props.customerId;
    this.productId = props.productId;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}