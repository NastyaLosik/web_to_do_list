"use strict";

var root = document.getElementById('root');

function MainPage() {
  var hasTasks = false;
  var tasks = [];

  function TaskInput() {
    var container = document.createElement('div');
    container.className = 'task-input-container';
    container.innerHTML = "\n            <div class=\"input-container\">\n                <input placeholder=\"Title...\" class=\"title-input\">\n                <input placeholder=\"About...\" class=\"about-input\">\n            </div>\n            <button class=\"add-button\">+</button>";
    return container;
  }

  function _setupListeners(element) {
    var titleInput = element.querySelector('.title-input');
    var aboutInput = element.querySelector('.about-input');
    var addButton = element.querySelector('.add-button');
    addButton.addEventListener('click', function () {
      return AddTask(titleInput, aboutInput);
    });
  }

  function AddTask(titleInput, aboutInput) {
    var title = titleInput.value.trim();
    var about = aboutInput.value.trim();

    if (title && about) {
      var newTask = {
        title: title,
        about: about
      };
      tasks.push(newTask);
      hasTasks = true;
      titleInput.value = '';
      aboutInput.value = '';
      render();
    } else {
      alert('Поля не должны быть пустыми.');
    }
  }

  function render() {
    root.innerHTML = '';
    root.appendChild(TaskInput());

    _setupListeners(root);

    if (hasTasks) {
      tasks.forEach(function (task, index) {
        var taskElement = createTaskElement(task, index);
        root.appendChild(taskElement);
      });
    } else {
      var noTasksMessage = document.createElement('div');
      noTasksMessage.className = 'main-container';
      noTasksMessage.innerHTML = "\n                <div class=\"text-main-container\">\n                    <span>No tasks</span>\n                </div>";
      root.appendChild(noTasksMessage);
    }
  }

  function createTaskElement(task, index) {
    var taskElement = document.createElement('div');
    taskElement.className = 'task-container';
    taskElement.innerHTML = "\n            <div class=\"task-container-text\">\n                <h3>".concat(task.title, "</h3>\n                <p>").concat(task.about, "</p>\n            </div>\n            <button class=\"delete-button\" id=\"deleteButton-").concat(index, "\">x</button>");
    var deleteButton = taskElement.querySelector("#deleteButton-".concat(index));
    deleteButton.addEventListener('click', function () {
      return deleteTask(index);
    });
    return taskElement;
  }

  function deleteTask(index) {
    var confirmationDialog = document.createElement('div');
    confirmationDialog.className = 'delete-container';
    confirmationDialog.innerHTML = "\n            <div class=\"delete-container-content\">\n                <span>Delete this task?</span>\n                <div class=\"delete-buttons\">\n                    <button class=\"yes-button\">Yes</button>\n                    <button class=\"no-button\">No</button>\n                </div>\n            </div>";
    root.appendChild(confirmationDialog);
    var yesButton = confirmationDialog.querySelector('.yes-button');
    var noButton = confirmationDialog.querySelector('.no-button');
    yesButton.addEventListener('click', function () {
      tasks.splice(index, 1);

      if (tasks.length === 0) {
        hasTasks = false;
      }

      root.removeChild(confirmationDialog);
      render();
    });
    noButton.addEventListener('click', function () {
      root.removeChild(confirmationDialog);
    });
  }

  render();
}

MainPage();