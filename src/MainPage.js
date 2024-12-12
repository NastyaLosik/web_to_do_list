import { TaskInput } from './TaskInput.js';
import { createTaskElement } from './Task.js';
import { Edit } from './Edit.js';
import { getTasks, saveTasks } from './storage.js';
import { deleteTask } from './deleteTask.js'

let root = document.getElementById("root");

function MainPage() {
  let hasTasks = false;
  let tasks = getTasks();

  function render() {
    root.innerHTML = "";
    root.appendChild(TaskInput(handleAddTask));

    if (tasks.length > 0) {
      hasTasks = true;
      tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index, handleDeleteTask, handleEditTask);
        root.appendChild(taskElement);
      });
    } else {
      hasTasks = false;
      const noTasksMessage = document.createElement("div");
      noTasksMessage.className = "main-container";
      noTasksMessage.innerHTML = `
                <div class="text-main-container">
                  <span>No tasks</span>
                </div>`;
      root.appendChild(noTasksMessage);
    }
  }

  function handleAddTask(title, about) {
    const newTask = { title, about };
    tasks.push(newTask);
    saveTasks(tasks);
    render();
  }

  function handleDeleteTask(index) {
    deleteTask(index, tasks, () => {
      saveTasks(tasks);
      render();
    });
  }

  function handleEditTask(index) {
    Edit(index, tasks[index], (updatedTask) => {
      tasks[index] = updatedTask;
      saveTasks(tasks);
      render();
    });
  }
  render();
}

MainPage();
