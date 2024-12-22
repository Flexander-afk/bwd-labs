let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Функция для отображения задач
function renderTasks(filterTags = []) {
    const taskList = document.getElementById('task-list');
    const inProgressList = document.getElementById('in-progress-list');
    const completedList = document.getElementById('completed-list');

    taskList.innerHTML = '';
    inProgressList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        // Проверка на наличие тегов для фильтрации
        if (filterTags.length > 0 && !task.tags.some(tag => filterTags.includes(tag))) {
            return; // Пропустить задачу, если ни один тег не совпадает
        }

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('draggable', true); // Добавляем возможность перетаскивания
        card.dataset.id = task.id; // Сохраняем ID задачи в атрибуте data-id

        if (task.status === 'pending') {
            card.classList.add('pending');
        } else if (task.status === 'in-progress') {
            card.classList.add('in-progress');
        } else if (task.status === 'completed') {
            card.classList.add('completed');
        }

        const taskName = document.createElement('p');
        taskName.textContent = task.text;

        const tags = document.createElement('p');
        tags.textContent = `Теги: ${task.tags.join(', ')}`; // Отображение тегов

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
        card.appendChild(tags); // Добавление тегов к карточке
        card.appendChild(deleteButton);

        // Добавление обработчиков для перетаскивания
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.id); // Сохраняем ID задачи при начале перетаскивания
        });

        if (task.status === 'pending') {
            taskList.appendChild(card);
        } else if (task.status === 'in-progress') {
            inProgressList.appendChild(card);
        } else {
            completedList.appendChild(card);
        }
    });

    // Добавление обработчиков для перетаскивания на колонки
    [taskList, inProgressList, completedList].forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault(); // Разрешаем перетаскивание
        });

        list.addEventListener('drop', (e) => {
            const taskId = e.dataTransfer.getData('text/plain'); // Получаем ID перетаскиваемой задачи
            const task = tasks.find(t => t.id == taskId); // Находим задачу по ID

            if (task) {
                // Меняем статус задачи в зависимости от колонки
                if (list === taskList) {
                    task.status = 'pending';
                } else if (list === inProgressList) {
                    task.status = 'in-progress';
                } else if (list === completedList) {
                    task.status = 'completed';
                }

                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks(); // Обновляем отображение задач
            }
        });
    });
}

// Функция для добавления новой задачи
function addTask() {
    const taskInput = document.getElementById('task-input');
    const tagInput = document.getElementById('tag-input');

    // Проверяем, что поля не пустые
    if (taskInput.value.trim() === '' || tagInput.value.trim() === '') {
        return; // Выход, если поля пустые
    }

    const newTask = {
        id: Date.now(), // Используем текущее время как уникальный ID
        text: taskInput.value.trim(), // Убираем пробелы
        tags: tagInput.value.split(',').map(tag => tag.trim()), // Разделяем и убираем пробелы
        status: 'pending' // Устанавливаем статус по умолчанию
    };

    tasks.push(newTask); // Добавляем новую задачу в массив
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Сохраняем в локальное хранилище
    renderTasks(); // Обновляем отображение задач

    // Очищаем поля ввода
    taskInput.value = '';
    tagInput.value = '';
}

// Функция для удаления задачи
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Функция для изменения статуса задачи
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

// Функция для фильтрации задач по тегам
function filterTasksByTags() {
    const filterInput = document.getElementById('filter-input').value;
    const filterTags = filterInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    renderTasks(filterTags);
}

// Добавление обработчиков событий
document.getElementById('add-task-submit').addEventListener('click', (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    addTask(); // Вызываем функцию добавления задачи
});

document.getElementById('filter-button').addEventListener('click', filterTasksByTags);

// Начальное отображение задач
renderTasks();

