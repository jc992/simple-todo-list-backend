import Boom from '@hapi/boom';

export const BadRequestException = (message) => {
  return Boom.badRequest(message);
};

export const ERROR_MESSAGES = {
  NO_DESCRIPTION: 'You must provide a description in the request body.',
}
