import { InferModel } from 'drizzle-orm';
import { appointments, services, users, locations, availability } from './schema';

export type Appointment = InferModel<typeof appointments>;
export type NewAppointment = InferModel<typeof appointments, 'insert'>;

export type Service = InferModel<typeof services>;
export type NewService = InferModel<typeof services, 'insert'>;

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;

export type Location = InferModel<typeof locations>;
export type NewLocation = InferModel<typeof locations, 'insert'>;

export type Availability = InferModel<typeof availability>;
export type NewAvailability = InferModel<typeof availability, 'insert'>;