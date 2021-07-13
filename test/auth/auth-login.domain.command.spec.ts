import { LoginCommand } from '../../src/auth/login/domain/command/login.command';
import { User } from '../../src/auth/login/domain/entity/user';
import { LoginErrors } from '../../src/auth/login/domain/value-object/login.errors';
import { HashedPassword } from '../../src/auth/core/domain/value-object/hashed-password';
import { DomainErrors } from '../../src/shared/domain/value-object/util/domain-errors';

describe('AuthLoginCommand', () => {
  describe('create', () => {
    it('given the user was not found then return null and add invalid credentials error', () => {
      const errors = new LoginErrors();
      const foundUser = null;
      const command = LoginCommand.new(foundUser, '', errors);
      expect(command).toBeNull();
      expect(errors.errors).toContain(LoginCommand.invalidCredentials);
    });

    it('given the user exists and the passwords do not match then return null and add invalid credentials error', () => {
      const errors = new LoginErrors();
      const hashedPassword = HashedPassword.newPrimitive('123');
      const foundUser = new User('', '', hashedPassword);
      const command = LoginCommand.new(foundUser, 'aa', errors);
      expect(command).toBeNull();
      expect(errors.errors).toContain(LoginCommand.invalidCredentials);
    });

    it('given the user exists and the passwords match then return command and do not add errors', () => {
      const errors = new LoginErrors();
      const hashedPassword = HashedPassword.newPrimitive('123');
      const userId = 'abc';
      const foundUser = new User(userId, '', hashedPassword);
      const command = LoginCommand.new(foundUser, '123', errors);
      if (command === null) throw new Error();

      expect(command.generateJwt.userId).toBe(userId);
      expect(DomainErrors.isEmpty(errors)).toBeTruthy();
    });
  });
});
