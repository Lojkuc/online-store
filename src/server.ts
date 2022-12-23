// import { homedir } from 'os';
// import account from './assets/pages/account';
import home from './assets/pages/homePages';
import about from './assets/pages/about';
import products from './assets/pages/products';
import product1 from './assets/pages/product1';
import cart from './assets/pages/cart';
import Catalog from './components/products';
import SingleProduct from './components/singleProduct';
import './assets/style/style.scss';

class Server {
    routes = [
        {
            path: '/',
            data: home,
        },
        {
            path: '/about',
            data: about,
        },
        {
            path: '/products',
            data: products,
        },
        {
            path: '/product0',
            data: product1,
        },
        {
            path: '/cart',
            data: cart,
        },
        {
            path: '/login',
            data: `LOGIN`,
        },
        {
            path: '/404',
            data: `<h1>Page not found</h1>`,
        },
    ];

    route = (event: Event) => {
        event.preventDefault();
        let block = event.target as HTMLLinkElement;

        if (block.href === undefined) {
            block = event.currentTarget as HTMLLinkElement;
        }
        const href: string = block.href;

        window.history.pushState({}, '', href);
        this.handleLocation();
    };

    handleLocation = () => {
        const html =
            this.routes.find((route) => route.path == window.location.pathname) || this.routes[this.routes.length - 1];
        const blockForContent: Element | null = document.getElementById('content');

        if (blockForContent !== null) {
            blockForContent.innerHTML = html.data;
        }

        if (html.path === '/products') {
            const catalog = new Catalog(blockForContent);
            catalog.render();
        }

        if (window.location.pathname.includes('/product')) {
            const singleProduct = new SingleProduct(blockForContent);
            const numProduct = window.location.pathname.slice(8);
            singleProduct.render(numProduct);
        }

        window.addEventListener('popstate', this.handleLocation);
        window.addEventListener('DOMContentLoaded', this.handleLocation);
    };
}

const server = new Server();
server.handleLocation();
