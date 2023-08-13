const inputTask = document.querySelector('#add-task'); // input add task
const btnAddTask = document.querySelector('#add-task-button'); // botão add task
const taskList = document.querySelector('#tasks'); // lista de tarefas
const btnEdit = document.querySelectorAll('.edit'); // botão editar
const btnDelete = document.querySelectorAll('.delete'); // botão deletar
let arrTasks = []; // array de tasks

const verifyInput = () => {
  if (inputTask.value.length > 0) return true; // checando se o input não está vazio
  return false; // checando se o input está vazio
};
const createTask = newTask => {
  const task = document.createElement('div'); // criando uma div
  task.classList.add('task'); // adicionando uma classe nome task
  task.innerHTML = `<div class="custom-checkbox">
      <input type="checkbox" id="meu-checkbox-${taskList.childElementCount}" />
      <label for="meu-checkbox-${taskList.childElementCount}">
        <span class="unchecked-icon"><i class="material-icons">radio_button_unchecked</i></span>
        <span class="checked-icon"><i class="material-icons">task_alt</i></span>
        <span class="task-text">${newTask}</span>
      </label>
      <span class="material-icons edit">edit</span>
      <span class="material-icons delete">delete</span>
    </div>`; // adicionando conteúdo
  taskList.appendChild(task); // adicionando a div na lista
  inputTask.value = ''; // limpando o input
};

const saveTasks = () => {
  const checkboxes = document.querySelectorAll('[id^="meu-checkbox-"]'); // selecionando todos os checkboxes das tasks
  arrTasks = []; // limpando o array
  const allTaskElements = document.querySelectorAll('.task'); // selecionando todas as tasks
  allTaskElements.forEach((task, index) => {
    const taskValue = task.querySelector('.task-text').textContent; // selecionando o conteúdo da task
    arrTasks.push({ checkId: checkboxes[index].id, checked: checkboxes[index].checked, valueTask: taskValue }); // adicionando as tasks ao array
    localStorage.setItem('tasks', JSON.stringify(arrTasks)); // salvando as tasks no local storage
  }); // salvando as tasks
};

document.addEventListener('change', e => {
  if (e.target.closest('[id^="meu-checkbox-"]')) {
    saveTasks(); // salvando as tasks
  }
}); // salvando as tasks ao clicar no checkbox

document.addEventListener('click', e => {
  const target = e.target;

  if (target.closest('#add-task-button') && verifyInput()) {
    createTask(inputTask.value);
    saveTasks();
  } // checando se o botão é clicado e se o input não está vazio

  if (target.classList.contains('edit')) {
    const newValue = prompt('Enter new value'); // colendo o novo conteúdo
    if (newValue === '' || newValue === null) return; // checando se o novo conteúdo é vazio ou nulo
    target.parentElement.querySelector('span:nth-child(3)').textContent = newValue; // atualizando o conteúdo da task
    saveTasks(); // salvando as tasks
    console.log('edit');
  } // checando se o botão editar é clicado

  if (target.classList.contains('delete')) {
    if (JSON.parse(localStorage.getItem('tasks')).length === 1) {
      localStorage.removeItem('tasks'); // removendo a task do local storage
    } // checando se o botão deletar é clicado
    target.parentNode.parentNode.remove(); // removendo a task
    saveTasks(); // salvando as tasks
    console.log('delete');
  } // checando se o botão deletar é clicado
});

document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')); // carregando as tasks
  if (tasks) {
    arrTasks = tasks; // passando as tasks para o array
    tasks.forEach(task => {
      createTask(task.valueTask); // adicionando as tasks
      const checkboxElement = document.querySelector('#' + task.checkId); // selecionando o checkbox
      if (checkboxElement) {
        checkboxElement.checked = task.checked; // atualizando o checkbox
      } // checando se o checkbox existe
    }); // adicionando as tasks e atualizando o checkbox
  } // carregando as tasks se existirem
});
