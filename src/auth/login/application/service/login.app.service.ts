import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginRepository } from '../adapter/login.repository';
import { LoginAppServiceRequest } from './login.app.service.request';
import { LoginDomainService } from '../../domain/service/login.domain.service';

import { LoginAppServiceResponse } from './login.app.service.response';
import { JwtService } from '../adapter/jwt.service';
import { LoginErrors } from '../../domain/value-object/login.errors';

@Injectable()
export class LoginAppService {
  constructor(
    readonly repository: LoginRepository,
    readonly jwtService: JwtService,
  ) {}

  async invoke(
    request: LoginAppServiceRequest,
  ): Promise<LoginAppServiceResponse> {
    const errors = new LoginErrors();
    const domainService = new LoginDomainService();

    const foundUser = await this.repository.getOneUserByUsername(
      request.username,
    );

    const command = await domainService.invoke(
      foundUser,
      request.password.val,
      errors,
    );
    if (command === null) throw new BadRequestException({ errors: errors });

    return new LoginAppServiceResponse(
      this.jwtService.sign({ userId: command.generateJwt.userId }),
    );
  }
}
