function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    // Сохранение текущей темы в localStorage
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode'); // Применяем темную тему
    } else {
        body.classList.remove('dark-mode'); // Применяем светлую тему
    }
});


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    const inProgressList = document.getElementById('in-progress-list');
    const completedList = document.getElementById('completed-list');

    taskList.innerHTML = '';
    inProgressList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.classList.add('card');

        if (task.status === 'pending') {
            card.classList.add('pending');
        } else if (task.status === 'in-progress') {
            card.classList.add('in-progress');
        } else if (task.status === 'completed') {
            card.classList.add('completed');
        }

        const taskName = document.createElement('p');
        taskName.textContent = task.text;
        taskName.style.flexGrow = '1'; // Позволим наименованию занимать свободное пространство

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = () => deleteTask(task.id);
        deleteButton.className = 'delete-button';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.status === 'completed';
        checkbox.onchange = () => toggleTaskStatus(task.id);

        card.appendChild(checkbox);
        card.appendChild(taskName);
        card.appendChild(deleteButton);

        if (task.status === 'pending') {
            taskList.appendChild(card);
        } else if (task.status === 'in-progress') {
            inProgressList.appendChild(card);
        } else {
            completedList.appendChild(card);
        }
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const newTask = {
        id: Date.now(),
        text: taskInput.value,
        status: 'pending'
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    taskInput.value = '';
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleTaskStatus(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.status = task.status === 'pending' ? 'in-progress' : task.status === 'in-progress' ? 'completed' : 'pending';
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Сохранение текущей темы в localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Установка сохраненной темы при загрузке страницы
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    renderTasks(); // Вызов функции для отображения задач при загрузке
};



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

// Добавление закрытия диалога по нажатию Escape
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        closeDialog();
    }
});

function toggleMenu() {
    document.querySelector('.nav').classList.toggle('active');
    const sidebar = document.getElementById('sidebar'); // Получаем элементы сайдбара
    const burger = document.getElementById('burger'); // Получаем бургер-меню

    // Переключаем классы для сайдбара и бургер-меню
    sidebar.classList.toggle('active');
    burger.classList.toggle('active');

    // Предотвращаем прокрутку страницы, когда сайдбар открыт
    document.body.classList.toggle('no-scroll');
}
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode'); // Применяем темную тему
    } else {
        body.classList.remove('dark-mode'); // Применяем светлую тему
    }

    renderTasks(); // Вызов функции для отображения задач при загрузке

    const dialog = document.getElementById('taskDialog');
    const addTaskButton = document.getElementById('add-task-button');
    const closeDialogButton = document.getElementById('closeDialog');
    const addTaskSubmitButton = document.getElementById('add-task-submit');

    // Открытие диалога
    addTaskButton.addEventListener('click', () => {
        dialog.showModal();
    });

    // Закрытие диалога
    closeDialogButton.addEventListener('click', () => {
        dialog.close();
    });

    // Добавление задачи при отправке формы
    addTaskSubmitButton.addEventListener('click', (event) => {
        event.preventDefault();
        addTask();
        dialog.close(); // Закрываем диалог после добавления задачи
    });

    // Закрытие диалога при нажатии вне его области
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});