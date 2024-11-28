import type { APIRoute } from 'astro';
import { AppointmentRepository } from '../../db/repositories/appointments';
import { DatabaseError } from '../../db/errors';
import { z } from 'zod';

const AppointmentSchema = z.object({
  serviceId: z.string().uuid(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  notes: z.string().optional()
});

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (startDate && endDate) {
      const appointments = await AppointmentRepository.findByDateRange(
        new Date(startDate),
        new Date(endDate)
      );
      return new Response(JSON.stringify(appointments), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Date range is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    const status = error instanceof DatabaseError ? 500 : 400;
    return new Response(JSON.stringify({ error: error.message }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const data = AppointmentSchema.parse(body);

    // In a real app, you'd get these from authentication/session
    const userId = 'default-user-id';
    const locationId = 'default-location-id';

    const appointment = await AppointmentRepository.create({
      userId,
      locationId,
      serviceId: data.serviceId,
      date: new Date(data.date),
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      notes: data.notes
    });

    return new Response(JSON.stringify(appointment), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    const status = error instanceof DatabaseError ? 500 : 400;
    return new Response(JSON.stringify({ error: error.message }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};