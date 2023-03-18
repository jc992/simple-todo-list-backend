import Joi from 'joi';

const todoSchema = {
  id: Joi.number(),
  state: Joi.string(),
  description: Joi.string().allow(''),
  createdAt: Joi.date(),
  completedAt: Joi.date().allow(null),
};

export const TODO_VALIDATION_CONFIG = {
  POST: {
    validate: {
      payload: Joi.object({
        description: Joi.string().required(), // TODO figure out how to give custom error messages
      }).label('PostPayload'),
    },
    response: {
      schema: Joi.object(todoSchema).label('PostResponse'),
    },
  },
};
