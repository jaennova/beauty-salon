import { eq } from 'drizzle-orm';
import { db } from '../config';
import { services, type NewService } from '../schema';
import { DatabaseError } from '../errors';

export class ServiceRepository {
  static async create(service: NewService) {
    try {
      const [result] = await db.insert(services)
        .values(service)
        .returning();
      return result;
    } catch (error) {
      throw new DatabaseError('Failed to create service', { cause: error });
    }
  }

  static async findAll() {
    try {
      return await db.select().from(services);
    } catch (error) {
      throw new DatabaseError('Failed to find services', { cause: error });
    }
  }

  static async findById(id: string) {
    try {
      const [result] = await db.select()
        .from(services)
        .where(eq(services.id, id));
      return result;
    } catch (error) {
      throw new DatabaseError('Failed to find service', { cause: error });
    }
  }

  static async update(id: string, data: Partial<NewService>) {
    try {
      const [result] = await db.update(services)
        .set(data)
        .where(eq(services.id, id))
        .returning();
      return result;
    } catch (error) {
      throw new DatabaseError('Failed to update service', { cause: error });
    }
  }
}