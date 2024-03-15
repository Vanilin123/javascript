function createAppTitle(title){
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}
function createTodoItemForm(){
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primery');
    button.textContent = 'Добавьте дело';
    button.disabled = true;
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);
    input.addEventListener('input', function(){
        if (input.value !== ""){
            button.disabled = false;
        }else{
            button.disabled = true;
        }
    })
    return {
        form,
        input,
        button,
    };
}

function createTodoList(){
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItem(todoItem, { Done, Delete }){
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'aling-items-center');
    item.textContent = todoItem.name;
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    if (todoItem.done == true){
    item.classList.add('list-group-item-success');	
    } 
    doneButton.addEventListener('click', function(){
       Done ({todoItem, element:item});
        item.classList.toggle('list-group-item-success');
    });
    deleteButton.addEventListener('click', function(){
        Delete ({todoItem, element:item});
    });
    buttonGroup.append(deleteButton);
    buttonGroup.append(doneButton);
    item.append(buttonGroup);
    return item
        
    
}
async function createTodoApp(container,{
      title,
      owner,
      todoItemList = [],
      oncreateFormSubmint,
      onDoneClick,
      onDeleteClick,
    }
  ) {
  const createAppTitleItem = createAppTitle(title),
  todoItemForm = createTodoItemForm(),
  todoList = createTodoList(),
  buttons = { Done: onDoneClick, Delete: onDeleteClick };
  container.append(createAppTitleItem);
  container.append(todoItemForm.form);
  container.append(todoList);
  todoItemList.forEach((todoItem) => {
    const todoItemElement = createTodoItem(todoItem, buttons);
    todoList.append(todoItemElement);
  });
  todoItemForm.form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!todoItemForm.input.value) {
        return;
      }
    const todoItem = await oncreateFormSubmint({
      owner,
      name: todoItemForm.input.value.trim(),
    });
    let todoItemElement = createTodoItem(todoItem, buttons);
    todoList.append(todoItemElement);
    todoItemForm.input.value = '';
  });
}
export { createTodoApp };