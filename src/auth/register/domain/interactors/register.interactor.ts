import { BadRequestException, Injectable } from '@nestjs/common';
import { DomainErrors } from 'src/shared/domain/value-objects/util/domain-errors';
import { DomainErrorsProp } from 'src/shared/domain/value-objects/util/domain-errors-prop';
import { RegisterRepository } from '../adapters/register.repository';
import { NonExistingUsername } from '../value-objects/non-existing-username';
import { User } from '../entities/user';
import { RegisterInteractorRequest } from './register.interactor.request';
import { NonExistingEmail } from '../value-objects/non-existing-email';
import { HashedPassword } from 'src/auth/core/domain/value-objects/hashed-password';
import { Password } from 'src/auth/core/domain/value-objects/password';

@Injectable()
export class RegisterInteractor {
  static ValidationError = class {
    static usernameExists = 'debe ingresar uno no registrado en el sistema';
    static emailExists = 'debe ingresar uno no registrado en el sistema';
  };

  // constructor(readonly repository: RegisterRepository) {}

  async invoke(request: RegisterInteractorRequest): Promise<void> {
    console.dir(request);
    // const errors = new DomainErrors();
    // const nonExistingUsername = NonExistingUsername.parse(
    //   request.username,
    //   this.repository,
    //   errors,
    //   DomainErrorsProp.username,
    // );
    // const nonExistingEmail = NonExistingEmail.parse(
    //   request.email,
    //   this.repository,
    //   errors,
    //   DomainErrorsProp.email,
    // );

    // if (nonExistingUsername === null || nonExistingEmail === null)
    //   throw new BadRequestException(errors);

    // await this.saveNewUser(
    //   request.password,
    //   nonExistingUsername,
    //   nonExistingEmail,
    // );
  }

  // async saveNewUser(
  //   password: Password,
  //   nonExistingUsername: NonExistingUsername,
  //   nonExistingEmail: NonExistingEmail,
  // ): Promise<void> {
  //   const hashedPassword = await HashedPassword.new(password);
  //   const newUser = User.new(
  //     nonExistingUsername,
  //     hashedPassword,
  //     nonExistingEmail,
  //   );
  //   await this.repository.saveNewUser(newUser);
  // }
}
