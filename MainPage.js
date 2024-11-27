let root = document.getElementById("root");

function MainPage() {
  let hasTasks = false;
  let deletebutton = false;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function TaskInput() {
    const container = document.createElement("div");
    container.className = "task-input-container";
    container.innerHTML = `
            <div class="input-container">
                <input placeholder="Title..." class="title-input">
                <input placeholder="About..." class="about-input">
            </div>
            <button class="add-button">+</button>`;
    return container;
  }

  function _setupListeners(element) {
    let titleInput = element.querySelector(".title-input");
    let aboutInput = element.querySelector(".about-input");
    let addButton = element.querySelector(".add-button");
    addButton.addEventListener("click", () => AddTask(titleInput, aboutInput));
  }

  function AddTask(titleInput, aboutInput) {
    const title = titleInput.value.trim();
    const about = aboutInput.value.trim();
    if (title && about) {
      const newTask = { title, about };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      hasTasks = true;
      titleInput.value = "";
      aboutInput.value = "";
      render();
    } else {
      alert("Поля не должны быть пустыми.");
    }
  }

  function render() {
    root.innerHTML = "";
    root.appendChild(TaskInput());
    _setupListeners(root);

    if (tasks.length > 0) {
      hasTasks = true;
      tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
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

  function createTaskElement(task, index) {
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-element";
    taskContainer.innerHTML = `
            <div class="task-container">
                <div class="task-container-text">
                    <h3>${task.title}</h3>
                    <p>${task.about}</p>
                </div>
                <button class="delete-button" id="deleteButton-${index}">x</button>
            </div>`;

    const deleteButton = taskContainer.querySelector(`#deleteButton-${index}`);
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTask(index);
    });

    const editMenu = document.createElement("div");
    editMenu.className = "edit-menu";
    editMenu.id = `editMenu-${index}`;
    editMenu.style.display = "none";
    editMenu.innerHTML = `
            <div class="block-buttons">
                <button class="button-share"><img src="../icons/Share.svg" alt="Share"></button>
                <button class="button-i">i</button>
                <button class="button-edit"><img src="../icons/edit.svg" alt="Edit"></button>
            </div>`;

    const buttonShare = editMenu.querySelector(".button-share");
    const buttonI = editMenu.querySelector(".button-i");
    const buttonEdit = editMenu.querySelector(".button-edit");

    buttonShare.addEventListener("click", () => Share());
    buttonEdit.addEventListener("click", () => Edit(index));

    taskContainer.appendChild(editMenu);

    taskContainer.addEventListener("click", () => {
      const isEditMenuVisible = editMenu.style.display === "flex";
      editMenu.style.display = isEditMenuVisible ? "none" : "flex";
    });

    return taskContainer;
  }

  function Share() {
    const shareContainer = document.createElement("div");
    shareContainer.className = "share-container";
    shareContainer.innerHTML = `
            <div class="share-container-content">
                <div class="share-buttons">
                    <button class="share-button"><img src="../icons/copy.svg" alt="Copy"></button>
                    <button class="vk-button"><img src="../icons/vk.svg" alt="VK"></button>
                    <button class="telegram-button"><img src="../icons/telegram.svg" alt="Telegram"></button>
                    <button class="whatsapp-button"><img src="../icons/whatsapp.svg" alt="WhatsApp"></button>
                    <button class="facebook-button"><img src="../icons/facebook.svg" alt="Facebook"></button>
                </div>
            </div>`;
    root.appendChild(shareContainer);
  }

  function Edit(index) {
    const editContainer = document.createElement("div");
    editContainer.className = "edit-container";
    editContainer.innerHTML = `
            <div class="edit-container-content">
                <div class="edit-window">
                    <input type="text" value="${tasks[index].title}" class="edit-title" >                    
                    <input type="text" value="${tasks[index].about}" class="edit-about" >
                    <div class="buttons">
                        <button class="cancel">Cancel</button>
                        <button class="save">Save</button>
                    </div>
                </div>
            </div>`;

    root.appendChild(editContainer);

    const cancelButton = editContainer.querySelector(".cancel");
    const saveButton = editContainer.querySelector(".save");

    saveButton.addEventListener("click", () => {
      tasks[index].title = editContainer.querySelector(".edit-title").value;
      tasks[index].about = editContainer.querySelector(".edit-about").value;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      root.removeChild(editContainer);
      render();
    });

    cancelButton.addEventListener("click", () => {
      root.removeChild(editContainer);
    });
  }

  function deleteTask(index) {
    deletebutton = true;
    const confirmationDialog = document.createElement("div");
    confirmationDialog.className = "delete-container";
    confirmationDialog.innerHTML = `
            <div class="delete-container-content">
                <span>Delete this task?</span>
                <div class="delete-buttons">
                    <button class="yes-button">Yes</button>
                    <button class="no-button">No</button>
                </div>
            </div>`;
    root.appendChild(confirmationDialog);
    const yesButton = confirmationDialog.querySelector(".yes-button");
    const noButton = confirmationDialog.querySelector(".no-button");
    yesButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      if (tasks.length === 0) {
        hasTasks = false;
      }
      root.removeChild(confirmationDialog);
      render();
    });
    noButton.addEventListener("click", () => {
      root.removeChild(confirmationDialog);
    });
  }
  render();
}
MainPage();
