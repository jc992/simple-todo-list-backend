import { config } from 'dotenv';
import { BadRequestException } from '../errors/errors.js';
import { default as users } from '../models/user.model.js';

config();

export default {
  getUser: async ({ auth: { credentials } }) => {
    try {
      return users.get(credentials);
    } catch (e) {
      console.error({ e });
      return BadRequestException(e.message);
    }
  },
  updateUser: async ({ payload, auth: { credentials } }) => {
    try {
      return users.update(payload, credentials);
    } catch (e) {
      console.error({ e });
      return false;
    }
  },
};
