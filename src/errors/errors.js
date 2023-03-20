import Boom from '@hapi/boom';

export const NotFoundException = (message) => {
  return Boom.notFound(message);
};

export const BadRequestException = (message) => {
  return Boom.badRequest(message);
};

export const ERROR_MESSAGES = {
  MISSING_ID: 'You must provide an id in the URL.',
  NON_EXISTANT_ID: 'There is no entry with the matching id.',
  NON_EXISTANT_USER: 'There is no user with this username.',
  NO_DESCRIPTION: 'You must provide a description in the request body.',
  NO_COMPLETE_TODO_UPDATE: 'You cannot change description on a COMPLETE task.',
  INVALID_UPDATE_PAYLOAD: 'You must provide either a state or description update parameter.'
}
