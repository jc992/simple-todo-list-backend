import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

export const swaggerConfig = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Todo API Documentation',
        version: '1.0.0',
      },
      documentationPath: '/docs',
    },
  },
];
