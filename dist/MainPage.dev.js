"use strict";

var root = document.getElementById('root');

function MainPage() {
  var hasTasks = false;
  var deletebutton = false;
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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
      localStorage.setItem('tasks', JSON.stringify(tasks));
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

    if (tasks.length > 0) {
      hasTasks = true;
      tasks.forEach(function (task, index) {
        var taskElement = createTaskElement(task, index);
        root.appendChild(taskElement);
      });
    } else {
      hasTasks = false;
      var noTasksMessage = document.createElement('div');
      noTasksMessage.className = 'main-container';
      noTasksMessage.innerHTML = "\n                <div class=\"text-main-container\">\n                    <span>No tasks</span>\n                </div>";
      root.appendChild(noTasksMessage);
    }
  }

  function createTaskElement(task, index) {
    var taskContainer = document.createElement('div');
    taskContainer.className = 'task-element';
    taskContainer.innerHTML = "\n            <div class=\"task-container\">\n                <div class=\"task-container-text\">\n                    <h3>".concat(task.title, "</h3>\n                    <p>").concat(task.about, "</p>\n                </div>\n                <button class=\"delete-button\" id=\"deleteButton-").concat(index, "\">x</button>\n            </div>");
    var deleteButton = taskContainer.querySelector("#deleteButton-".concat(index));
    deleteButton.addEventListener('click', function () {
      return deleteTask(index);
    });
    var editMenu = document.createElement('div');
    editMenu.className = 'edit-menu';
    editMenu.id = "editMenu-".concat(index);
    editMenu.style.display = 'none';
    editMenu.innerHTML = "\n            <div class=\"block-buttons\">\n                <button class=\"button-share\"><img src=\"../icons/Share.svg\" alt=\"Share\"></button>\n                <button class=\"button-i\">i</button>\n                <button class=\"button-edit\"><img src=\"../icons/edit.svg\" alt=\"Edit\"></button>\n            </div>";
    var buttonShare = editMenu.querySelector('.button-share');
    var buttonI = editMenu.querySelector('.button-i');
    var buttonEdit = editMenu.querySelector('.button-edit');
    buttonShare.addEventListener('click', function () {
      return Share();
    });
    buttonEdit.addEventListener('click', function () {
      return Edit(index);
    });
    taskContainer.appendChild(editMenu);
    taskContainer.addEventListener('click', function () {
      var isEditMenuVisible = editMenu.style.display === 'flex';
      editMenu.style.display = isEditMenuVisible ? 'none' : 'flex';
    });
    return taskContainer;
  }

  function Share() {
    var shareContainer = document.createElement('div');
    shareContainer.className = 'share-container';
    shareContainer.innerHTML = "\n            <div class=\"share-container-content\">\n                <div class=\"share-buttons\">\n                    <button class=\"share-button\"><img src=\"../icons/copy.svg\" alt=\"Copy\"></button>\n                    <button class=\"vk-button\"><img src=\"../icons/vk.svg\" alt=\"VK\"></button>\n                    <button class=\"telegram-button\"><img src=\"../icons/telegram.svg\" alt=\"Telegram\"></button>\n                    <button class=\"whatsapp-button\"><img src=\"../icons/whatsapp.svg\" alt=\"WhatsApp\"></button>\n                    <button class=\"facebook-button\"><img src=\"../icons/facebook.svg\" alt=\"Facebook\"></button>\n                </div>\n            </div>";
    root.appendChild(shareContainer);
  }

  function Edit(index) {
    var editContainer = document.createElement('div');
    editContainer.className = 'edit-container';
    editContainer.innerHTML = "\n            <div class=\"edit-container-content\">\n                <div class=\"edit-window\">\n                    <input type=\"text\" value=\"".concat(tasks[index].title, "\" class=\"edit-title\" >                    \n                    <input type=\"text\" value=\"").concat(tasks[index].about, "\" class=\"edit-about\" >\n                    <div class=\"buttons\">\n                        <button class=\"cancel\">Cancel</button>\n                        <button class=\"save\">Save</button>\n                    </div>\n                </div>\n            </div>");
    root.appendChild(editContainer);
    var cancelButton = editContainer.querySelector('.cancel');
    var saveButton = editContainer.querySelector('.save');
    saveButton.addEventListener('click', function () {
      tasks[index].title = editContainer.querySelector('.edit-title').value;
      tasks[index].about = editContainer.querySelector('.edit-about').value;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      root.removeChild(editContainer);
      render();
    });
    cancelButton.addEventListener('click', function () {
      root.removeChild(editContainer);
    });
  }

  function deleteTask(index) {
    deletebutton = true;
    var confirmationDialog = document.createElement('div');
    confirmationDialog.className = 'delete-container';
    confirmationDialog.innerHTML = "\n            <div class=\"delete-container-content\">\n                <span>Delete this task?</span>\n                <div class=\"delete-buttons\">\n                    <button class=\"yes-button\">Yes</button>\n                    <button class=\"no-button\">No</button>\n                </div>\n            </div>";
    root.appendChild(confirmationDialog);
    var yesButton = confirmationDialog.querySelector('.yes-button');
    var noButton = confirmationDialog.querySelector('.no-button');
    yesButton.addEventListener('click', function () {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));

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