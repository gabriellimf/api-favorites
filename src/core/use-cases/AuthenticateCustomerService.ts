import { ICustomerRepository } from '../repositories/ICustomerRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

type AuthRequest = {
  email: string;
  password: string;
}

type AuthResponse = {
  token: string;
}

export class AuthenticateCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute({ email, password }: AuthRequest): Promise<AuthResponse> {
    const customer = await this.customerRepository.findByEmail(email);
    
    if (!customer || !(await compare(password, customer.password))) {
      throw new Error('Invalid email or password.');
    }

    const token = sign({ id: customer.id }, process.env.JWT_SECRET as string, {
      subject: customer.id,
      expiresIn: '1d',
    });

    return { token };
  }
}