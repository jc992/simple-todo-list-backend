import Joi from 'joi';

const todoSchema = {
  id: Joi.number(),
  state: Joi.string(),
  description: Joi.string().allow(''),
  createdAt: Joi.date(),
  completedAt: Joi.date().allow(null),
};

const registerResponse = {
  username: Joi.string(),
  accessToken: Joi.string(),
}

export const TODO_VALIDATION_CONFIG = {
  GET: {
    validate: {
      query: Joi.object({
        filter: Joi.string().optional(),
        orderBy: Joi.string().optional(),
      }),
    },
    response: {
      schema: Joi.array().items(todoSchema).label('GetResponse'),
    },
  },
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
  PATCH: {
    validate: {
      query: Joi.object({
        id: Joi.string().required(), // TODO figure out how to give custom error messages
      }),
      payload: Joi.object({
        state: Joi.string().optional(),
        description: Joi.string().optional(),
      }).label('UpdatePayload'),
    },
    response: {
      schema: Joi.object(todoSchema).label('UpdateResponse'),
    },
  },
  DELETE: {
    validate: {
      query: Joi.object({
        id: Joi.string().required(), // TODO figure out how to give custom error messages
      }),
    },
    response: { schema: Joi.object({}).label('DeleteResponse') },
  },
};

export const USER_VALIDATION_CONFIG = {
  REGISTER: {
    validate: {
      payload: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    },
    response: {
      schema: Joi.object(registerResponse).label('RegisterResponse'),
    },
  },
};
