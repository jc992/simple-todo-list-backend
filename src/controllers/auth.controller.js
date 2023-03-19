import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { config } from 'dotenv';
import knex from '../database/database.js';
import { TABLES } from '../constants.js';

config();

const { users } = TABLES;

export default {
  
  login: async ({ auth: { credentials } }) => {
    return {
      credentials,
      accessToken: jsonwebtoken.sign(credentials, process.env.JWT_SECRET),
    };
  },

  register: async ({ payload }) => {
    const { username, password } = payload;
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);

    await knex(users).insert({
      username,
      hash,
      salt,
      createdAt: new Date(),
    });

    return {
      username,
      accessToken: jsonwebtoken.sign({ username }, process.env.JWT_SECRET),
    };
  },
};
