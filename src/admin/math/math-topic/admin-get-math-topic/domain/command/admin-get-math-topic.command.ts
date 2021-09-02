import { MathTopic } from '../entity/math-topic';
import { User } from '../entity/user';
import { AdminGetMathTopicErrors } from '../value-object/admin-get-math-topic.errors';

export class AdminGetMathTopicCommand {
  private constructor(readonly mathTopic: MathTopic) {}

  static readonly notFound = 'no existe';
  static readonly userNotAdmin = 'debe ser administrador';

  static new(
    user: User | null,
    mathTopic: MathTopic | null,
    errors: AdminGetMathTopicErrors,
  ): AdminGetMathTopicCommand | null {
    if (user === null) {
      errors.userId.push(this.notFound);
      return null;
    }

    if (!user.isAdmin) {
      errors.userId.push(this.userNotAdmin);
      return null;
    }

    if (mathTopic === null) {
      errors.userId.push(this.notFound);
      return null;
    }

    return new AdminGetMathTopicCommand(mathTopic);
  }
}
