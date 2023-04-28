import fastify, { RouteShorthandOptions, FastifyRequest } from 'fastify';

const server = fastify();

server.get('/', async (req, res) => {
  res.send('Hello world');
});

const AppointmentSchema: RouteShorthandOptions = {
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
          pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$',
        },
      },
      required: ['user_id', 'doctor_id', 'date_time'],
    },
  },
};

interface BodyType {
  user_id: string;
  doctor_id: string;
  date_time: string;
}

server.post('/', AppointmentSchema, async (request: FastifyRequest<{ Body: BodyType }>, response) => {
  const { user_id, doctor_id, date_time } = request.body;
});

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
