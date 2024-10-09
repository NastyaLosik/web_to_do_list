let root = document.getElementById('root');

function MainPage() {
    let hasTasks = false;
    let tasks = []; 
    function TaskInput() {
        const container = document.createElement('div');
        container.className = 'task-input-container';
        container.innerHTML = `
            <div class="input-container">
                <input placeholder="Title..." class="title-input">
                <input placeholder="About..." class="about-input">
            </div>
            <button class="add-button">+</button>`;
        return container;
    }
    function _setupListeners(element) {
        let titleInput = element.querySelector('.title-input');
        let aboutInput = element.querySelector('.about-input');
        let addButton = element.querySelector('.add-button');
        addButton.addEventListener('click', () => AddTask(titleInput, aboutInput));
    }
    function AddTask(titleInput, aboutInput) {
        const title = titleInput.value.trim();
        const about = aboutInput.value.trim();
        if (title && about) {
            const newTask = { title, about };
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
            tasks.forEach((task, index) => {
                const taskElement = createTaskElement(task, index);
                root.appendChild(taskElement);
            });
        } else {
            const noTasksMessage = document.createElement('div');
            noTasksMessage.className = 'main-container';
            noTasksMessage.innerHTML = `
                <div class="text-main-container">
                    <span>No tasks</span>
                </div>`;
            root.appendChild(noTasksMessage);
        }
    }

    function createTaskElement(task, index) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-container';
        taskElement.innerHTML = `
            <div class="task-container-text">
                <h3>${task.title}</h3>
                <p>${task.about}</p>
            </div>
            <button class="delete-button" id="deleteButton-${index}">x</button>`;

        const deleteButton = taskElement.querySelector(`#deleteButton-${index}`);
        deleteButton.addEventListener('click', () => deleteTask(index));
        return taskElement;
    }

    function deleteTask(index) {
        const confirmationDialog = document.createElement('div');
        confirmationDialog.className = 'delete-container';
        confirmationDialog.innerHTML = `
            <div class="delete-container-content">
                <span>Delete this task?</span>
                <div class="delete-buttons">
                    <button class="yes-button">Yes</button>
                    <button class="no-button">No</button>
                </div>
            </div>`;
        root.appendChild(confirmationDialog); 
        const yesButton = confirmationDialog.querySelector('.yes-button');
        const noButton = confirmationDialog.querySelector('.no-button');
        yesButton.addEventListener('click', () => {
            tasks.splice(index, 1); 
            if (tasks.length === 0) {
                hasTasks = false; 
            }
            root.removeChild(confirmationDialog);
            render(); 
        });
        noButton.addEventListener('click', () => {
            root.removeChild(confirmationDialog);
        });
    }
    render();
}
MainPage()