import knex from '../database/database.js';
import { TABLES, TODO_FIELDS, TODO_STATE } from '../constants.js';

const { todos } = TABLES;

export default {
  insert: async (description) => {
    const result = await knex(todos).returning(TODO_FIELDS).insert({
      description,
      state: TODO_STATE.INCOMPLETE,
      createdAt: new Date(),
    });

    return result[0];
  },
};
