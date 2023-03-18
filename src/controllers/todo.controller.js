import { BadRequestException, ERROR_MESSAGES } from '../errors/errors.js';
import { default as todos } from '../models/todo.model.js';

export default {
  /**
   * This route adds an item to the to-do list.
   * @param (Payload) description {String} Description of the item (e.g., Buy milk at the store.).
   * @returns {Object} JSON object, representing the created item, with the following structure:
   * id: Unique identifier of the list item.
   * state: State of the item (i.e., COMPLETE or INCOMPLETE).
   * description: Description of the item (e.g., Buy milk at the store.).
   * createdAt: Creation date of the item (e.g., 2021-05-12T07:23:45.678Z).
   * completedAt: Completion date of the item (e.g., 2021-05-13T11:23:45.678Z).
   */
  post: async (request) => {
    const { payload } = request;
    if (!payload?.description) {
      throw BadRequestException(ERROR_MESSAGES.NO_DESCRIPTION);
    }

    try {
      return todos.insert(payload.description);
    } catch (e) {
      console.error({ e });
      throw BadRequestException(e.message);
    }
  },
};
