import { default as TodoController } from './controllers/todo.controller.js';
import { TODO_VALIDATION_CONFIG } from './config/validation.js';

export default [
  {
    method: 'GET',
    path: '/todos',
    options: {
      handler: TodoController.get,
      description: 'Get Todo List',
      notes:
        'This route lists the to-do items considering the conditions imposed on the query parameters below',
      tags: ['api'],
      ...TODO_VALIDATION_CONFIG.GET,
    },
  },
  {
    method: 'POST',
    path: '/todos',
    options: {
      handler: TodoController.post,
      description: 'Post Todo Item',
      notes: 'This route adds an item to the to-do list',
      tags: ['api'],
      ...TODO_VALIDATION_CONFIG.POST,
    },
  },
  {
    method: 'PATCH',
    path: '/todos',
    options: {
      handler: TodoController.update,
      description: 'Update Todo Item',
      notes:
        'This route edits an item on the to-do list. The edited item will be referenced by id using the URL parameter id',
      tags: ['api'],
      ...TODO_VALIDATION_CONFIG.PATCH,
    },
  },
  {
    method: 'DELETE',
    path: '/todos',
    options: {
      handler: TodoController.delete,
      description: 'Delete Todo Item',
      notes:
        'This route removes an item from the to-do list. The item will be referenced by id using the URL parameter id',
      tags: ['api'],
      ...TODO_VALIDATION_CONFIG.DELETE,
    },
  },
];
