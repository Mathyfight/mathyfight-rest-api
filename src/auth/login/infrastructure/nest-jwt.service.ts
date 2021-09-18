import { JwtPayload } from 'src/shared/domain/value-object/general/jwt-payload';
import { JwtService } from '../adapter/interface/jwt.service';
import { JwtService as NestJwtServiceN } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestJwtService implements JwtService {
  readonly jwtService: NestJwtServiceN;

  constructor() {
    this.jwtService = new NestJwtServiceN({
      secret: process.env.MATHYFIGHT_JWT_SECRET,
      signOptions: { expiresIn: '90d' },
    });
  }

  sign(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
