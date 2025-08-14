import { Request, Response } from 'express';
import { AuthenticateCustomerService } from '../../../core/use-cases/AuthenticateCustomerService';

export class AuthController {
  constructor(private authenticateCustomerService: AuthenticateCustomerService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const authResponse = await this.authenticateCustomerService.execute({ email, password });
      return response.status(200).json(authResponse);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}