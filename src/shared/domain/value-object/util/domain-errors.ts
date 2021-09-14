export abstract class DomainErrors {
  abstract errors: string[];
  abstract username: string[];
  abstract password: string[];
  abstract email: string[];
  abstract page: string[];
  abstract userId: string[];
  abstract equipmentId: string[];
  abstract resetPasswordTokenId: string[];
  abstract avatarEquipmentId: string[];
  abstract areaId: string[];
  abstract topicId: string[];
  abstract difficultyLevelId: string[];
  abstract battleId: string[];
  abstract name: string[];
  abstract image: string[];
  abstract levelId: string[];
  abstract enemyId: string[];
  abstract difficultyId: string[];
  abstract answerId: string[];
  abstract raceId: string[];
  abstract color: string[];
  abstract description: string[];
  abstract mathAreaId: string[];
  abstract enemyIds: string[];
  abstract buyPrice: string[];
  abstract attack: string[];
  abstract defense: string[];
  abstract mathTopicId: string[];
  abstract mathProblemId: string[];
  abstract mathAnswersDescription: string[];
  abstract mathAnswersIsCorrect: string[];
  abstract mathAnswersIds: string[];

  static isEmpty(errors: Partial<DomainErrors>): boolean {
    return Object.values(errors).every((prop) => prop.length === 0);
  }
}

export enum DomainErrorsProp {
  errors = 'errors',
  username = 'username',
  password = 'password',
  email = 'email',
  page = 'page',
  userId = 'userId',
  equipmentId = 'equipmentId',
  resetPasswordTokenId = 'resetPasswordTokenId',
  avatarEquipmentId = 'avatarEquipmentId',
  areaId = 'areaId',
  topicId = 'topicId',
  difficultyLevelId = 'difficultyLevelId',
  battleId = 'battleId',
  name = 'name',
  image = 'image',
  levelId = 'levelId',
  enemyId = 'enemyId',
  difficultyId = 'difficultyId',
  answerId = 'answerId',
  color = 'color',
  raceId = 'raceId',
  description = 'description',
  mathAreaId = 'mathAreaId',
  enemyIds = 'enemyIds',
  buyPrice = 'buyPrice',
  attack = 'attack',
  defense = 'defense',
  mathTopicId = 'mathTopicId',
  mathProblemId = 'mathProblemId',
  mathAnswersIds = 'mathAnswersIds',
  mathAnswersDescription = 'mathAnswersDescription',
  mathAnswersIsCorrect = 'mathAnswersIsCorrect',
}
