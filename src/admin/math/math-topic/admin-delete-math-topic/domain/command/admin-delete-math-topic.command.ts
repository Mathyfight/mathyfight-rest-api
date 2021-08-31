import { MathTopic } from '../entity/math-topic';
import { User } from '../entity/user';
import { AdminDeleteMathTopicErrors } from '../value-object/admin-delete-math-topic.errors';

export class AdminDeleteMathTopicCommand {
  private constructor(readonly mathTopic: MathTopic) {}

  static readonly userNotFound = 'debe existir';
  static readonly userNotAdmin = 'debe ser administrador';
  static readonly mathTopicNotFound = 'debe existir';
  static readonly mathTopicHasBattles = 'no debe tener batallas asociadas';

  static new(
    user: User | null,
    mathTopic: MathTopic | null,
    errors: AdminDeleteMathTopicErrors,
  ): AdminDeleteMathTopicCommand | null {
    if (user === null) errors.userId.push(this.userNotFound);

    if (mathTopic === null) errors.topicId.push(this.mathTopicNotFound);

    if (user === null || mathTopic === null) return null;

    const userIsNotAdmin = !user.isAdmin;
    if (userIsNotAdmin) errors.userId.push(this.userNotAdmin);

    const mathTopicHasABattle = mathTopic.hasAnyBattle;
    if (mathTopicHasABattle) errors.topicId.push(this.mathTopicHasBattles);

    if (mathTopicHasABattle || userIsNotAdmin) return null;

    return new AdminDeleteMathTopicCommand(mathTopic);
  }
}
