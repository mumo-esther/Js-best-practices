let tasks = [];

function loadTasks() {
  const tasksJson = localStorage.getItem('tasks');
  if (tasksJson !== null) {
    tasks = JSON.parse(tasksJson);
  }
}

loadTasks();

function renderTasks() {
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = '';
  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((task) => {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      listItem.appendChild(checkbox);
      const description = document.createElement('span');
      description.textContent = task.description;
      if (task.completed) {
        description.classList.add('completed');
      }
      listItem.appendChild(description);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);

      checkbox.addEventListener('change', (event) => {
        task.completed = event.target.checked;
        if (task.completed) {
          description.classList.add('completed');
        } else {
          description.classList.remove('completed');
        }
        saveTasks();
      });

      deleteButton.addEventListener('click', () => {
        deleteTask(task.index);
        renderTasks();
      });
    });

    const allTasksCompleted = tasks.every((task) => task.completed);
    const clearAllButton = document.querySelector('#clear-all');
    clearAllButton.disabled = !allTasksCompleted;
}

renderTasks();

function addTask(description) {
  const task = {
    description,
    completed: false,
    index: tasks.length
  };
  tasks.push(task);
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  tasks.forEach((task, i) => {
    task.index = i;
  });
  saveTasks();
}

function editTaskDescription(index, description) {
  tasks[index].description = description;
  saveTasks();
}

function saveTasks() {
  const tasksJson = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksJson);
}

