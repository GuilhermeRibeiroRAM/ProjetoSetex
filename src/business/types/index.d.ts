import { ITokenPayload } from '@/domain/model/token-payload';

declare global {
  namespace Express {
    interface Request {
      user: ITokenPayload;
    }
  }
}
