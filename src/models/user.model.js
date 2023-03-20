import bcryptjs from 'bcryptjs';
import knex from '../database/database.js';
import { TABLES } from '../constants.js';
import { NotFoundException, ERROR_MESSAGES } from '../errors/errors.js';

const { users } = TABLES;

export default {
  get: async (credentials) => {
    const user = await knex
      .first('*')
      .from(users)
      .where({ username: credentials.username });

    if (!user) {
      throw NotFoundException(ERROR_MESSAGES.NON_EXISTANT_USER);
    }

    return { username: user.username, createdAt: user.createdAt }
  },

  update: async (payload, credentials) => {
    const user = await knex
      .first('*')
      .from(users)
      .where({ username: credentials.username });

    if (!user) {
      throw NotFoundException(ERROR_MESSAGES.NON_EXISTANT_USER);
    }

    const username = payload?.username ?? user.username;
    const salt = payload?.password ? await bcryptjs.genSalt() : user.salt;
    const hash = payload?.password
      ? await bcryptjs.hash(payload.password, salt)
      : user.hash;

    await knex(users).where({ username: credentials.username }).update({
      username,
      salt,
      hash,
    });

    return true;
  },
};
