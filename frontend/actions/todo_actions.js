import * as APIUtil from '../utils/todo_api_utils';
export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TODO_ERROR = "TODO_ERROR";

export function requestTodos(team_id) {
  return (dispatch) => {
    return APIUtil.fetchTodos(team_id).then(todos => dispatch(receiveTodos(todos)));
  };
}

export function requestTodo(todo_id, team_id) {
  return (dispatch) => {
    return APIUtil.fetchTodo(todo_id, team_id).then(todo => dispatch(receiveTodo(todo)));
  };
}

export function createTodo(todo) {
  return (dispatch) => {
    return APIUtil.createTodo(todo)
      .then(todo => dispatch(receiveTodo(todo)),
            err => dispatch(todoError(err.responseJSON)));
  };
}

export function updateTodo(todo) {
  return (dispatch) => {
    return APIUtil.updateTodo(todo).then(todo => dispatch(receiveTodo(todo)));
  };
}

export function destroyTodo(todo) {
  return (dispatch) => {
    return APIUtil.destroyTodo(todo).then(todo => dispatch(removeTodo(todo)));
  };
}

export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
});

export const receiveTodo = todo => ({
  type: RECEIVE_TODO,
  todo
});

export const removeTodo = todo => ({
  type: REMOVE_TODO,
  todo
});

export const todoError = error => ({
  type: TODO_ERROR,
  error
});
