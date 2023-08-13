const inputTask = document.querySelector('#add-task');
const btnAddTask = document.querySelector('#add-task-button');
const taskList = document.querySelector('#tasks');
const btnEdit = document.querySelectorAll('.edit');
const btnDelete = document.querySelectorAll('.delete');

const verifyInput = () => {
  if (inputTask.value.length > 0) return true; // check if input is empty
  return false; // check if input is not empty
};
const createTask = newTask => {
  const task = document.createElement('div');
  task.classList.add('task');
  task.innerHTML = `<div class="custom-checkbox">
      <input type="checkbox" id="meu-checkbox-${taskList.childElementCount}" />
      <label for="meu-checkbox-${taskList.childElementCount}">
        <span class="unchecked-icon"><i class="material-icons">radio_button_unchecked</i></span>
        <span class="checked-icon"><i class="material-icons">task_alt</i></span>
        <span class="task-text">${newTask}</span>
      </label>
      <span class="material-icons edit">edit</span>
      <span class="material-icons delete">delete</span>
    </div>`;
  taskList.appendChild(task);
  inputTask.value = '';
};

let arrTasks = [];
const saveTasks = () => {
  const checkboxes = document.querySelectorAll('[id^="meu-checkbox-"]');
  arrTasks = [];
  const allTaskElements = document.querySelectorAll('.task');
  allTaskElements.forEach((task, index) => {
    const taskValue = task.querySelector('.task-text').textContent;
    arrTasks.push({ checkId: checkboxes[index].id, checked: checkboxes[index].checked, valueTask: taskValue });
    localStorage.setItem('tasks', JSON.stringify(arrTasks));
  });
};

document.addEventListener('change', e => {
  if (e.target.closest('[id^="meu-checkbox-"]')) {
    saveTasks();
  }
});

btnAddTask.addEventListener('click', () => {
  if (verifyInput()) {
    createTask(inputTask.value);
    saveTasks();
  }
});

document.addEventListener('click', e => {
  const target = e.target;
  if (target.classList.contains('edit')) {
    const newValue = prompt('Enter new value');
    target.parentElement.querySelector('span:nth-child(3)').textContent = newValue;
    saveTasks();
    console.log('edit');
  }
  if (target.classList.contains('delete')) {
    if (JSON.parse(localStorage.getItem('tasks')).length === 1) {
      localStorage.removeItem('tasks');
    }
    target.parentNode.parentNode.remove();
    saveTasks();
    console.log('delete');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    arrTasks = tasks;
    tasks.forEach(task => {
      createTask(task.valueTask);
      const checkboxElement = document.querySelector('#' + task.checkId);
      if (checkboxElement) {
        checkboxElement.checked = task.checked;
      }
    });
  }
});
