import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { EnemyTypeOrmMySql } from 'src/database/typeorm/mysql/entity/enemy.typeorm.mysql';
import { MathTopicLevelTypeOrmMySql } from 'src/database/typeorm/mysql/entity/math-topic-level.typeorm.mysql';
import { UserTypeOrmMySql } from 'src/database/typeorm/mysql/entity/user.typeorm.mysql';
import { Connection, Repository } from 'typeorm';
import { DeleteEnemyRespository } from '../adapter/interface/delete-enemy.respository';
import { DeleteEnemyCommand } from '../domain/command/delete-enemy.command';
import { Enemy } from '../domain/entity/enemy';
import { MathTopicLevel } from '../domain/entity/mathTopicLevel';
import { User } from '../domain/entity/user';

export class DeleteEnemyRepositoryTypeOrmMySqlRepository
  implements DeleteEnemyRespository
{
  constructor(
    @InjectRepository(UserTypeOrmMySql)
    readonly userRepository: Repository<UserTypeOrmMySql>,
    @InjectRepository(MathTopicLevelTypeOrmMySql)
    readonly mathTopicLevelRepository: Repository<MathTopicLevelTypeOrmMySql>,
    @InjectRepository(EnemyTypeOrmMySql)
    readonly enemyRepository: Repository<EnemyTypeOrmMySql>,
    readonly connection: Connection,
  ) {}

  async deleteImage(filename: string): Promise<void> {
    const blobClient = this.getBlobClient(filename);
    await blobClient.deleteIfExists();
    return;
  }

  getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(
      process.env.MATHYFIGHT_AZURE_STORAGE_URL!,
    );
    const containerClient = blobClientService.getContainerClient(
      process.env.MATHYFIGHT_AZURE_STORAGE_CONTAINER!,
    );
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  async getMathTopicLevel(enemyId: string): Promise<MathTopicLevel | null> {
    const mathTopicLevel = await this.mathTopicLevelRepository.findOne({
      where: { id: enemyId },
    });
    if (mathTopicLevel === undefined) return null;
    return new MathTopicLevel(mathTopicLevel.id);
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user === undefined) return null;
    return new User(user.isAdmin);
  }

  async getEnemyData(enemyId: string): Promise<Enemy | null> {
    const enemy = await this.enemyRepository.findOne({
      where: { id: enemyId },
    });
    if (enemy === undefined) return null;
    return new Enemy(enemy.id, enemy.name, enemy.imageUrl);
  }

  async deleteEnemy(cmd: DeleteEnemyCommand): Promise<void> {
    const enemy = await this.getEnemyData(cmd.enemyId);

    if (enemy === null) return;
    const filename = `enemy_${enemy.id}.${path.extname(enemy.imageUrl)}`;
    await this.deleteImage(filename);

    await this.connection.transaction('SERIALIZABLE', async (manager) => {
      await manager.delete(EnemyTypeOrmMySql, {
        id: cmd.enemyId,
      });
    });
    return;
  }
}
