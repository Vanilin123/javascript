import { createTodoApp } from './form.js';
import {
  getTodoListServer,
  createTodoItemServer,
  TodoItemDoneServer,
  deleteTodoItemServer,
} from './todoServer.js';
import {
  getTodoListLocal,
  createTodoItemLocal,
  TodoItemDoneLocal,
  deleteTodoItemLocal,
} from './todoLocalstorage.js';
export async function render(owner, title, api) {
  const btnTransition = document.getElementById('btn-transition');
  btnTransition.textContent =
  api === 'server'
    ? 'Перейти на локальное хранилище'
    : 'Перейти на серверное хранилище';
  const todoItemList =
    api === 'server' ? await getTodoListServer(owner) : await getTodoListLocal(owner);
  const options = {
    title: title,
    owner: owner,
    todoItemList: todoItemList,
    oncreateFormSubmint:
      api === 'server' ?  createTodoItemServer :  createTodoItemLocal,
    onDoneClick:
      api === 'server' ? TodoItemDoneServer : TodoItemDoneLocal,
    onDeleteClick: api === 'server' ? deleteTodoItemServer : deleteTodoItemLocal,
  };
  const container = document.getElementById('todo-app');
 createTodoApp(container, options);
  const transition = document.getElementById('transition');
  const clickFunc = (e) => {
    e.preventDefault();
    transition.removeEventListener('click', clickFunc);
    container.innerHTML = '';
    if (api === 'local') {
      render(owner, title, 'server');
    } else {
      render(owner, title, 'local');
    }
  };
  transition.addEventListener('click', clickFunc);
}