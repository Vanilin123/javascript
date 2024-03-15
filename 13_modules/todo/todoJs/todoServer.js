  export async function getTodoListServer(owner) {
    const response = await fetch(
      `http://localhost:3000/api/todos?owner=${owner}`
    );
    return await response.json();
  }
  export async function createTodoItemServer({ owner, name }) {
    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        owner,
      }),
    });
    return await response.json();
  }
  export function TodoItemDoneServer({ todoItem }) {
    todoItem.done = !todoItem.done;
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: todoItem.done }),
      
    });
  }
  
  export function deleteTodoItemServer({element, todoItem }) {
    if (!confirm('Вы уверены?')) {
      return;
    }
    element.remove()
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
      method: 'DELETE',
    });
  }