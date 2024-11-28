import { eq, and, gte, lte } from 'drizzle-orm';
import { db } from '../config';
import { appointments, users, services, type NewAppointment } from '../schema';
import { DatabaseError } from '../errors';

export class AppointmentRepository {
  static async create(appointment: NewAppointment) {
    try {
      const [result] = await db.insert(appointments)
        .values(appointment)
        .returning();
      return result;
    } catch (error) {
      throw new DatabaseError('Failed to create appointment', { cause: error });
    }
  }

  static async findById(id: string) {
    try {
      const [result] = await db.select()
        .from(appointments)
        .where(eq(appointments.id, id))
        .leftJoin(services, eq(appointments.serviceId, services.id))
        .leftJoin(users, eq(appointments.userId, users.id));
      return result;
    } catch (error) {
      throw new DatabaseError('Failed to find appointment', { cause: error });
    }
  }

  static async findByDateRange(startDate: Date, endDate: Date) {
    try {
      return await db.select()
        .from(appointments)
        .where(
          and(
            gte(appointments.date, startDate),
            lte(appointments.date, endDate)
          )
        )
        .leftJoin(services, eq(appointments.serviceId, services.id))
        .leftJoin(users, eq(appointments.userId, users.id));
    } catch (error) {
      throw new DatabaseError('Failed to find appointments in date range', { cause: error });
    }
  }

  static async updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') {
    try {
      const [result] = await db.update(appointments)
        .set({ status })
        .where(eq(appointments.id, id))
        .returning();
      return result;
    } catch (error) {
      throw new DatabaseError('Failed to update appointment status', { cause: error });
    }
  }
}