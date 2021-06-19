import { BadRequestException, Injectable } from '@nestjs/common';
import { DomainErrors } from 'src/shared/domain/value-object/util/domain-errors';
import { LoginRepository } from '../adapter/login.repository';
import { LoginAppServiceRequest } from './login.app.service.request';
import { LoginDomainService } from '../../domain/service/login.domain.service';

import { LoginAppServiceResponse } from './login.app.service.response';
import { JwtService } from '../adapter/jwt.service';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginAppService {
  constructor(
    readonly repository: LoginRepository,
    readonly jwtService: JwtService,
  ) {}

  async invoke(
    request: LoginAppServiceRequest,
  ): Promise<LoginAppServiceResponse> {
    const errors = new DomainErrors();
    const domainService = new LoginDomainService();

    const foundUser = await this.repository.getOneUserByUsername(
      request.username,
    );
    domainService.validateExistingUser(foundUser, errors);

    await domainService.validateMatchingPasswords(
      request.password,
      foundUser,
      errors,
    );

    if (errors.isNotEmpty || foundUser === null)
      throw new BadRequestException(errors);

    return new LoginAppServiceResponse(
      this.jwtService.sign({ userId: foundUser.id.val }),
    );
  }
}
