import { RouteShorthandOptions } from 'fastify';

export const addNewDocSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        spec: { type: 'string' },
        slots: {
          type: 'array',
          items: { type: 'string', format: 'date-time' },
        },
        appointments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              patientID: { type: 'string', format: 'uuid' },
              date: { type: 'string', format: 'date-time' },
            },
            required: ['user_id', 'date'],
          },
        },
      },
      required: ['id', 'name', 'spec', 'slots', 'appointments'],

    },
  },
};

export const AppointmentSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        user_id: {
          type: 'string',
          format: 'uuid',
        },
        doctor_id: {
          type: 'string',
          format: 'uuid',
        },
        date_time: {
          type: 'string',
          format: 'date-time',
        },
      },
      required: ['user_id', 'doctor_id', 'date_time'],
    },
  },
};

export const addNewUserSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        fullName: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phoneNumber: { type: 'string' },
      },
      required: ['id', 'fullName', 'email', 'phoneNumber'],
    },
  },
};
