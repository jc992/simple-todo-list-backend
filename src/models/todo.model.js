import knex from '../database/database.js';
import { FILTER_PARAMS, ORDER_BY_PARAMS, TABLES, TODO_FIELDS, TODO_STATE } from '../constants.js';

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
};
