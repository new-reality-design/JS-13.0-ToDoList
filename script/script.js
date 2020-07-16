'use strict';

//обертка для инпута
const todoControl = document.querySelector('.todo-control'),
  //сам инпут
  headerInput = document.querySelector('.header-input'),
  //список невыполненных дел
  todoList = document.querySelector('.todo-list'),
  //список выполненных дел
  todoCompleted = document.querySelector('.todo-completed'),
  //Контейнер для обоих списков дел
  allToDoItems = document.querySelector('.todo-container');

//Массив для хранения дел
let toDoData;

let checkStorage = localStorage.getItem('toDoData');

if (!checkStorage) {
  toDoData = [];
} else {
  toDoData = JSON.parse(checkStorage);
}



const render = function () {

  if (toDoData === undefined || toDoData === null) {
    localStorage.removeItem('toDoData');
  } else {
    //Очищаем textContent- чтобы избежать повторения данных при Рендере.
    todoList.textContent = '';
    todoCompleted.textContent = '';

    toDoData.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('todo-item');
      listItem.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

      if (item.completed) {
        todoCompleted.append(listItem);
      } else {
        todoList.append(listItem);
      }

      const btnToDoCompleted = listItem.querySelector('.todo-complete');
      btnToDoCompleted.addEventListener('click', function () {
        item.completed = !item.completed;
        localStorage.setItem('toDoData', JSON.stringify(toDoData));
        render();
      });

      const btnToDoDelete = listItem.querySelector('.todo-remove');
      btnToDoDelete.addEventListener('click', function () {
        toDoData.splice(index, 1);
        localStorage.setItem('toDoData', JSON.stringify(toDoData));
        render();
      });

    });
  }
};


todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  if (headerInput.value.trim() === '' || headerInput.value.length < 1) {

    headerInput.value = '';
    return alert('Не забудьте добавить задачу :)');

  } else {

    const newToDo = {
      value: headerInput.value,
      completed: false
    };

    toDoData.push(newToDo);

    localStorage.setItem('toDoData', JSON.stringify(toDoData));

    render();

    headerInput.value = '';
  }
});

render();

