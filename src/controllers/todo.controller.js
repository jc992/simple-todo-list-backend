import { BadRequestException, ERROR_MESSAGES } from '../errors/errors.js';
import { default as todos } from '../models/todo.model.js';

export default {
  /**
   * This route lists the to-do items considering the conditions imposed on the query parameters below.
   * @param (URL) filter {String} query parameter is optional and can be ‘ALL’, ‘COMPLETE’, or ‘INCOMPLETE’. If not specified, the default filter is ‘ALL’.
   * @param (URL) orderBy {String} query parameter is also optional and can be ‘DESCRIPTION’, ‘CREATED_AT’, or ‘COMPLETED_AT’. If not specified, the default order is ‘CREATED_AT’.
   * @returns {Array} JSON array of objects, where each object should have the following structure:
   * id: Unique identifier of the list item.
   * state: State of the item (i.e., COMPLETE or INCOMPLETE).
   * description: Description of the item (e.g., Buy milk at the store.).
   * createdAt: Creation date of the item (e.g., 2021-05-12T07:23:45.678Z).
   * completedAt: Completion date of the item (e.g., 2021-05-13T11:23:45.678Z).
   */
  get: async (request) => {
    const { query } = request;

    try {
      return todos.get(query);
    } catch (e) {
      console.error({ e });
      throw BadRequestException(e.message);
    }
  },

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

  /**
   * This route edits an item on the to-do list. The edited item will be referenced by id using the URL parameter id
   * @param (URL) id {String} Mandatory query parameter Unique identifier of the list item.
   * Note: Both payload params are optional, but at least one of them must be present for the request to be valid.
   * @param (Payload) state: State of the item (i.e., COMPLETE or INCOMPLETE).
   * @param (Payload) description: Description of the item (e.g., Buy milk at the store.).
   * @returns {Object} JSON object, representing the edited item, having the following structure:
   * id: Unique identifier of the list item.
   * state: State of the item (i.e., COMPLETE or INCOMPLETE).
   * description: Description of the item (e.g., Buy milk at the store.).
   * createdAt: Creation date of the item (e.g., 2021-05-12T07:23:45.678Z).
   * completedAt: Completion date of the item (e.g., 2021-05-13T11:23:45.678Z).
   */
  update: async (request, h) => {
    const { query, payload } = request;
    if (!query.id) {
      throw BadRequestException(ERROR_MESSAGES.MISSING_ID);
    }

    if (!payload.state && !payload.description) {
      throw BadRequestException(ERROR_MESSAGES.INVALID_UPDATE_PAYLOAD);
    }

    try {
      return todos.update(query.id, payload);
    } catch (e) {
      console.error({ e });
      throw BadRequestException(e.message);
    }
  },
};
