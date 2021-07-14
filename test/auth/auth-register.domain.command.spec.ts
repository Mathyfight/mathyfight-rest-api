import { DomainErrors } from '../../src/shared/domain/value-object/util/domain-errors';
import { RegisterCommand } from '../../src/auth/register/domain/command/register.command';
import { RegisterErrors } from '../../src/auth/register/domain/value-object/register.errors';
import { HashedPassword } from '../../src/auth/core/domain/value-object/hashed-password';
import { Uuid } from '../../src/shared/domain/value-object/general/uuid';

describe('AuthRegisterCommand', () => {
  describe('create', () => {
    it('given the username exists then return null and add not unique error', () => {
      const errors = new RegisterErrors();
      const command = RegisterCommand.new('', null, '', '', '', errors);
      expect(command).toBeNull();
      expect(errors.username).toContain(RegisterCommand.usernameNotUnique);
    });

    it('given the email exists then return null and add not unique error', () => {
      const errors = new RegisterErrors();
      const command = RegisterCommand.new(null, '', '', '', '', errors);
      expect(command).toBeNull();
      expect(errors.email).toContain(RegisterCommand.emailNotUnique);
    });

    it('given the username and the email do not exist then return command and do not add errors', () => {
      const errors = new RegisterErrors();
      const password = '123';
      const username = 'qwe';
      const email = 'qwe@gmail.com';
      const command = RegisterCommand.new(
        null,
        null,
        password,
        username,
        email,
        errors,
      );
      if (command === null) throw new Error();

      // validate user
      expect(Uuid.isValid(command.registerNewUser.id)).toBeTruthy();
      expect(command.registerNewUser.email).toBe(email);
      expect(
        HashedPassword.passwordsMatch(
          command.registerNewUser.hashedPassword,
          password,
        ),
      ).toBeTruthy();
      expect(command.registerNewUser.username).toBe(username);

      // // validate player
      // expect(Uuid.isValid(command.registerNewUser.player.id)).toBeTruthy();
      // expect(command.registerNewUser.player.gold).toBe(NewPlayer.initialGold);

      // // validate avatar
      // expect(
      //   Uuid.isValid(command.registerNewUser.player.avatar.id),
      // ).toBeTruthy();
      // expect(command.registerNewUser.player.avatar.attack).toBe(
      //   NewAvatar.initialAttack,
      // );
      // expect(command.registerNewUser.player.avatar.defense).toBe(
      //   NewAvatar.initialDefense,
      // );
      // expect(command.registerNewUser.player.avatar.color).toBe(
      //   NewAvatar.initialColor,
      // );
      // expect(command.registerNewUser.player.avatar.currentExperience).toBe(
      //   NewAvatar.initialExperience,
      // );
      // expect(command.registerNewUser.player.avatar.health).toBe(
      //   NewAvatar.initialHealth,
      // );
      // expect(command.registerNewUser.player.avatar.level).toBe(
      //   NewAvatar.initialLevel,
      // );
      // expect(command.registerNewUser.player.avatar.race).toBe(
      //   NewAvatar.initialRace,
      // );
      // expect(command.registerNewUser.player.avatar.name).toBe(username);

      // validate errors
      expect(DomainErrors.isEmpty(errors)).toBeTruthy();
    });
  });
});
