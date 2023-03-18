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
];
