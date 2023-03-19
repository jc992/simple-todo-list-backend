import bcryptjs from 'bcryptjs';
import { TABLES } from '../constants.js';
import knex from '../database/database.js';

const { users } = TABLES;

export const validateBasic = () => {
  return async (request, username, password) => {
    const user = await knex.first('*').from(users).where({ username });
    if (!user) {
      return { credentials: null, isValid: false };
    }

    const isValid = (await bcryptjs.hash(password, user.salt)) === user.hash;
    const credentials = { username };
    return { isValid, credentials };
  };
};
