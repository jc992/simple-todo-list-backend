import { config } from 'dotenv';
import Hapi from '@hapi/hapi';
import Basic from '@hapi/basic';
import AuthJwt from 'hapi-auth-jwt2';
import { validateBasic } from './auth/auth.js';
import { swaggerConfig } from './config/swagger.js';
import { JWT_STRATEGY } from './constants.js';
import { default as routes } from './routes.js';

config();

const main = async () => {
  const server = Hapi.server({
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: process.env.SERVER_PORT || '8000',
    routes: { cors: true },
    debug: { request: ['error'] },
  });

  await server.register(Basic);
  await server.register(AuthJwt);
  server.auth.strategy(JWT_STRATEGY, 'basic', { validate: validateBasic() });

  await server.register(swaggerConfig);
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

main();
