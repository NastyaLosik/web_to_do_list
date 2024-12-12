import { Share } from "./Share.js";
import { Edit } from "./Edit.js";
import { deleteTask } from "./deleteTask.js"
import { saveTask } from "./storage.js";

export function createTaskElement(task, index, handleDeleteTask, handleEditTask) {
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-element";
    taskContainer.innerHTML = `
          <div class="task-container">
              <div class="task-container-text">
                  <h3>${task.title}</h3>
                  <p>${task.about}</p>
              </div>
              <button class="delete-button">x</button>
          </div>`;
    
    const deleteButton = taskContainer.querySelector(".delete-button");
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        handleDeleteTask(index);
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
    buttonEdit.addEventListener("click", () => {
        handleEditTask(index)
    });

    taskContainer.appendChild(editMenu);

    taskContainer.addEventListener("click", () => {
      const isEditMenuVisible = editMenu.style.display === "flex";
      editMenu.style.display = isEditMenuVisible ? "none" : "flex";
    });
    
    return taskContainer;
}
