export default function addBurgerMenu() {
  const burgerMenu = document.querySelector('.burger-menu') as HTMLElement;
  const navMenu = document.querySelector('.nav-link') as HTMLElement;
  document.addEventListener('click', function (e) {
    const click = e.composedPath().includes(navMenu);
    const clickBurger = e.composedPath().includes(burgerMenu);
    if (clickBurger) {
      console.log('1');
      burgerMenu.classList.toggle('active');
      navMenu?.classList.toggle('active');
    }
    if (!clickBurger && !click) {
      burgerMenu.classList.remove('active');
      navMenu?.classList.remove('active');
    }
    if (click) {
      burgerMenu.classList.remove('active');
      navMenu?.classList.remove('active');
    }
  });
}
