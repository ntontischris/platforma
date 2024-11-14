import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'd2I8VxKg9P#mN$5jL&fQ3nRtYbEu7HcA';

interface DecodedToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export const withAuth = (handler: Handler) => {
  return async (event: HandlerEvent, context: HandlerContext) => {
    // Skip auth for login and public endpoints
    if (event.path.includes('/auth') || event.httpMethod === 'GET') {
      return handler(event, context);
    }

    try {
      const authHeader = event.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'No token provided' })
        };
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

      // Add user info to event context
      const eventWithUser = {
        ...event,
        user: {
          id: decoded.userId,
          role: decoded.role
        }
      };

      return handler(eventWithUser, context);
    } catch (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid token' })
      };
    }
  };
};