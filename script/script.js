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
    //Очищаем textContent- чтобы избежать повторения данных
    todoList.textContent = '';
    todoCompleted.textContent = '';

    toDoData.forEach(item => {
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
        // todoList.prepend(listItem);
      }

      const btnToDoCompleted = listItem.querySelector('.todo-complete');
      btnToDoCompleted.addEventListener('click', function () {
        item.completed = !item.completed;
        localStorage.setItem('toDoData', JSON.stringify(toDoData));
        //setItem - тогда при обновлении отметки не теряются.
        render();
      });
    });
  }
};


//Удаление дел
let btnDeleteCollection;
let btnDeleteArray = [];
let indexOf;

function deleteItem(e) {
  let itemIndex = e.target.parentNode.parentNode.indexOf;

  e.target.parentNode.parentNode.remove();
  toDoData.splice(itemIndex, 1);
  // console.log(toDoData.splice(itemIndex, 1));

  localStorage.removeItem('toDoData');
  localStorage.setItem('toDoData', JSON.stringify(toDoData));
}

function deleteItemOnClick() {
  if (toDoData.length > 0) {

    btnDeleteCollection = allToDoItems.getElementsByClassName('todo-remove');
    // console.log('btnDeleteCollection: ', btnDeleteCollection);
    btnDeleteArray = Array.from([...btnDeleteCollection]);
    // console.log('btnDeleteArray: ', btnDeleteArray);

    for (let btn of btnDeleteArray) {
      btn.addEventListener('click', event => {

        indexOf = btnDeleteArray.indexOf(btn);
        // console.log('STR 90', indexOf);
        deleteItem(event);
      });
    }

  }
}


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

    deleteItemOnClick();
  }
});

render();

deleteItemOnClick();