window.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  const tasks = getTasksFromStorage();
  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  saveTasksToStorage(tasks);

  input.value = '';
  loadTasks();
}

function renderTask(task, index) {
  const li = document.createElement('li');
  li.textContent = task.text;
  if (task.completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    const tasks = getTasksFromStorage();
    tasks[index].completed = !tasks[index].completed;
    saveTasksToStorage(tasks);
    loadTasks();
  });

  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '❌';
  removeBtn.className = 'remove-btn';
  removeBtn.title = 'Remove';
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    loadTasks();
  });

  li.appendChild(removeBtn);
  document.getElementById('taskList').appendChild(li);
}

function loadTasks() {
  const taskList = document.getElementById('taskList');
  const emptyMsg = document.getElementById('emptyMsg');
  taskList.innerHTML = '';

  const tasks = getTasksFromStorage();
  if (tasks.length === 0) {
    emptyMsg.style.display = 'block';
  } else {
    emptyMsg.style.display = 'none';
    tasks.forEach((task, i) => renderTask(task, i));
  }
}
