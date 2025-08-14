import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token is missing.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    request.user = { id: (decoded as any).sub };
    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Invalid token.' });
  }
}