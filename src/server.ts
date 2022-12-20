import './styles/products.scss';
import './styles/product1.scss';
import './assets/img/product1.jpg'
import account from './account';
const route = (event: Event) => {
    event.preventDefault();
    const block = event.target as HTMLLinkElement;
    window.history.pushState({}, '', block.href);
    handleLocation();
};
const routes = [
    {
        path: '/',
        data: `<h1>Welcome to Home page.</h1><p>A home page is the main web page of a website. The term also refers to one or more pages always shown in a web browser when the application starts up.</p>`,
    },
    {
        path: '/about',
        data: `<h1>Welcome to About page.</h1>      <p>The About page is the section of a website where people go to find out about the website they're on.</p>`,
    },
    {
        path: '/contact',
        data: `<h1>Welcome to Contact page.</h1>      <p>A contact page is a common web page on a website for visitors to contact the organization or individual providing the website.</p>`,
    },
    {
        path: '/account',
        data: account,
    },
    {
        path: '/404',
        data: `<h1>Page not found</h1>`,
    },
];
const handleLocation = () => {
    const html = routes.find((route) => route.path == window.location.pathname) || routes[routes.length - 1];
    const blockForContent: Element | null = document.getElementById('main-page');
    if (blockForContent !== null) {
        blockForContent.innerHTML = html.data;
    }
};
declare global {
    interface Window {
        route: typeof route;
    }
}
window.route = route;

window.addEventListener('popstate', handleLocation);
window.addEventListener('DOMContentLoaded', handleLocation);

handleLocation();

