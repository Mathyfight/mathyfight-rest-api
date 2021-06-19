import { JwtPayload } from 'src/auth/core/domain/value-object/jwt-payload';
import { JwtService } from '../application/adapter/jwt.service';
import { JwtService as NestJwtServiceN } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestJwtService implements JwtService {
  readonly jwtService: NestJwtServiceN;

  constructor() {
    this.jwtService = new NestJwtServiceN({
      secret: process.env.MATHYFIGHT_JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    });
  }

  sign(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
