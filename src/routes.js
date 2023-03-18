import { default as TodoController } from './controllers/todo.controller.js';
import { TODO_VALIDATION_CONFIG } from './config/validation.js';

export default [
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
