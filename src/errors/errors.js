import Boom from '@hapi/boom';

export const NotFoundException = (message) => {
  return Boom.notFound(message);
};

export const BadRequestException = (message) => {
  return Boom.badRequest(message);
};

export const ERROR_MESSAGES = {
  NON_EXISTANT_ID: 'There is no entry with the matching id.',
  NO_DESCRIPTION: 'You must provide a description in the request body.',
  NO_COMPLETE_TODO_UPDATE: 'You cannot change description on a COMPLETE task.',
}
