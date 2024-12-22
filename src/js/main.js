window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    renderTasks(); // Вызов функции для отображения задач при загрузке
};
