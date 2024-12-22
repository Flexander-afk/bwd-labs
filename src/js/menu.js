function toggleMenu() {
    document.querySelector('.nav').classList.toggle('active');
    const sidebar = document.getElementById('sidebar');
    const burger = document.getElementById('burger');

    sidebar.classList.toggle('active');
    burger.classList.toggle('active');

    document.body.classList.toggle('no-scroll');
}
