import { homedir } from 'os';
import account from './assets/pages/account';
import home from './assets/pages/home';
import about from './assets/pages/about';
import product from './assets/pages/product';
import cart from './assets/pages/cart';
import './assets/style/style.scss'
const route = (event: Event) => {
    event.preventDefault();
    const block = event.target as HTMLLinkElement;
    window.history.pushState({}, '', block.href);
    handleLocation();
};
const routes = [
    {
        path: '/',
        data: home,
    },
    {
        path: '/about',
        data: about,
    },
    {
        path: '/product',
        data: product,
    },
    {
        path: '/cart',
        data: cart,
    },
    {
        path: '/login',
        data: `LOGIN`
    },
    {
        path: '/404',
        data: `<h1>Page not found</h1>`,
    },
];
const handleLocation = () => {
    const html = routes.find((route) => route.path == window.location.pathname) || routes[routes.length - 1];
    const blockForContent: Element | null = document.getElementById('content');
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
