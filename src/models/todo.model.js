import knex from '../database/database.js';
import { FILTER_PARAMS, ORDER_BY_PARAMS, TABLES, TODO_FIELDS, TODO_STATE } from '../constants.js';
import { NotFoundException, ERROR_MESSAGES, BadRequestException } from '../errors/errors.js';

const { todos } = TABLES;

export default {
  get: async (query) => {
    const orderBy =
      ORDER_BY_PARAMS[query?.orderBy] ?? ORDER_BY_PARAMS.CREATED_AT;
    const state = FILTER_PARAMS[query?.filter] ?? FILTER_PARAMS.ALL;

    const result = await knex
      .returning(TODO_FIELDS)
      .select('*')
      .from(todos)
      .whereLike('state', state)
      .orderBy(orderBy, 'ASC');

    return result;
  },

  insert: async (description) => {
    const result = await knex(todos).returning(TODO_FIELDS).insert({
      description,
      state: TODO_STATE.INCOMPLETE,
      createdAt: new Date(),
    });

    return result[0];
  },

  update: async (id, payload) => {
    const todo = await knex.first('*').from(todos).where({ id });
    if (!todo) {
      throw NotFoundException(ERROR_MESSAGES.NON_EXISTANT_ID);
    }

    if (todo.state === TODO_STATE.COMPLETE && payload?.description) {
      throw BadRequestException(ERROR_MESSAGES.NO_COMPLETE_TODO_UPDATE);
    }

    const result = await knex(todos)
      .returning(TODO_FIELDS)
      .where({ id })
      .update({
        state: payload?.state ?? TODO_STATE.INCOMPLETE,
        description: payload?.description ?? todo.description,
        completedAt: payload?.state === TODO_STATE.COMPLETE ? new Date() : null,
      });

    return result[0];
  },
};
