import { getTask, saveTask } from "./storage.js";

export function Edit(index, task, handleEditTask) {
  const editContainer = document.createElement("div");

  editContainer.className = "edit-container";
  editContainer.innerHTML = `
        <div class="edit-window">
            <input type="text" value="${task.title}" class="edit-title">                    
            <input type="text" value="${task.about}" class="edit-about">
            <div class="buttons">
                <button class="cancel">Cancel</button>
                <button class="save">Save</button>
            </div>
        </div>`;

  const cancelButton = editContainer.querySelector(".cancel");
  const saveButton = editContainer.querySelector(".save");

  saveButton.addEventListener("click", () => {
    let task = {
      "title": '',
      "about": ''
    }
    task.title = editContainer.querySelector(".edit-title").value;
    task.about = editContainer.querySelector(".edit-about").value;

    saveTask(task, index);
    handleEditTask(task);
    document.body.removeChild(editContainer);
  });

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(editContainer);
  });

  document.body.appendChild(editContainer);
}
