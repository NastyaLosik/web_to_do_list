export function TaskInput(onAddTask) {
  const container = document.createElement("div");
  container.className = "task-input-container";
  container.innerHTML = `
        <div class="input-container">
            <input placeholder="Title..." class="title-input">
            <input placeholder="About..." class="about-input">
        </div>
        <button class="add-button">+</button>`;
  
  const titleInput = container.querySelector(".title-input");
  const aboutInput = container.querySelector(".about-input");
  const addButton = container.querySelector(".add-button");
  
  addButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const about = aboutInput.value.trim();
    if (title && about) {
      //hasTasks = true;

      onAddTask(title, about);
      titleInput.value = "";
      aboutInput.value = "";
    } else {
      alert("Поля не должны быть пустыми.");
    }
  });
  
  return container;
}