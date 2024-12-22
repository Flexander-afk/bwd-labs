// dialog.js
const dialog = document.getElementById('taskDialog');

function closeDialog() {
    if (dialog) {
        dialog.close();
    }
}

if (document.getElementById('closeDialog')) {
    document.getElementById('closeDialog').addEventListener('click', closeDialog);
}

document.addEventListener('click', (event) => {
    if (event.target === dialog) {
        closeDialog();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        closeDialog();
    }
});

const addTaskButton = document.getElementById('add-task-button');
const addTaskSubmitButton = document.getElementById('add-task-submit');

addTaskButton.addEventListener('click', () => {
    dialog.showModal();
});

addTaskSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    addTask(taskInput.value);
    closeDialog();
    taskInput.value = '';
});
