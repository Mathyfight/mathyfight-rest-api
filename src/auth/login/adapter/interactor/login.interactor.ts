import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginRepository } from '../interface/login.repository';
import { LoginInteractorRequest } from './login.interactor.request';
import { LoginInteractorResponse } from './login.interactor.response';
import { JwtService } from '../interface/jwt.service';
import { LoginErrors } from '../../domain/value-object/login.errors';
import { LoginCommand } from '../../domain/command/login.command';

@Injectable()
export class LoginInteractor {
  constructor(
    readonly repository: LoginRepository,
    readonly jwtService: JwtService,
  ) {}

  async invoke(
    request: LoginInteractorRequest,
  ): Promise<LoginInteractorResponse> {
    const errors = new LoginErrors();

    const foundUser = await this.repository.getOneUserByUsername(
      request.username,
    );

    const command = LoginCommand.new(foundUser, request.password.val, errors);
    if (command === null) throw new BadRequestException({ errors: errors });

    const jsonWebToken = this.jwtService.sign({
      userId: command.generateJwt.userId,
    });

    return new LoginInteractorResponse(jsonWebToken);
  }
}
