import { saveTask } from "./storage.js";

export function deleteTask(index, tasks, saveTask) {
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
    
    const yesButton = confirmationDialog.querySelector(".yes-button");
    const noButton = confirmationDialog.querySelector(".no-button");
    
    yesButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTask();
      document.body.removeChild(confirmationDialog);
    });
  
    noButton.addEventListener("click", () => {
      document.body.removeChild(confirmationDialog);
    });
  
    document.body.appendChild(confirmationDialog);
}
