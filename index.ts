import fastify from 'fastify';
import * as swagger from '@fastify/swagger';
import * as swaggerUI from '@fastify/swagger-ui';
import { addNewDocSchema, AppointmentSchema, addNewUserSchema } from './api/shemas.js';
import { addDoctor, regNewUser, addAppointment } from './api/index.js';

const server = fastify();

await server.register(swagger, {
  swagger: {
    info: {
      title: 'appointments-service',
      version: '1.0.0',
    },
    host: 'localhost:8080',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

await server.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecificationClone: true,
});

server.post('/regdoc', addNewDocSchema, addDoctor);

server.post('/reguser', addNewUserSchema, regNewUser);

server.post('/', AppointmentSchema, addAppointment);

server.ready((err) => {
  if (err) {
    throw err;
  }

  server.swagger();
});

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
