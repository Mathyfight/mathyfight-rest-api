import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';

export abstract class JwtService {
  abstract sign(payload: JwtPayload): string;
}
