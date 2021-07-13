import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';

export abstract class JwtService {
  abstract sign(payload: JwtPayload): string;
}
