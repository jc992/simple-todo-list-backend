export const TABLES = {
  todos: 'todos',
}

export const TODO_STATE = {
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE',
}

export const ORDER_BY_PARAMS = {
  DESCRIPTION: 'description',
  CREATED_AT: 'createdAt',
  COMPLETED_AT: 'completedAt',
}

export const FILTER_PARAMS = {
  ALL: '%',
  INCOMPLETE: TODO_STATE.INCOMPLETE,
  COMPLETE: TODO_STATE.COMPLETE,
}

export const TODO_FIELDS = ['id', 'description', 'state', 'createdAt', 'completedAt'];
