export default function addBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu') as HTMLElement;
    const navMenu = document.querySelector('.nav-link');
    burgerMenu?.addEventListener('click', function () {
        burgerMenu.classList.toggle('active');
        navMenu?.classList.toggle('active');
    });
}
