import { AdminUser } from '../../domain/entity/admin-user';

export abstract class GetAdminUserRepository {
  abstract getAdmin(userId: string): Promise<AdminUser | null>;
}
