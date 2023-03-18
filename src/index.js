import { config } from 'dotenv';
import Hapi from '@hapi/hapi';
import { swaggerConfig } from './config/swagger.js';
import { default as routes } from './routes.js';

config();

const main = async () => {
  const server = Hapi.server({
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: process.env.SERVER_PORT || '8000',
    routes: { cors: true },
    debug: { request: ['error'] },
  });

  server.route(routes);
  await server.register(swaggerConfig);
  await server.start();

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

main();
