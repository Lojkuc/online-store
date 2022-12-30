import Home from './components/home';
import About from './components/about';
import Products from './components/products';
import SingleProduct from './components/singleProduct';
import Err from './components/error';
import './assets/style/style.scss';

class Server {
    routes = [
        {
            path: '/',
            data: Home,
        },
        {
            path: '/about',
            data: About,
        },
        {
            path: '/products',
            data: Products,
        },
        {
            path: '/product-detail',
            data: SingleProduct,
        },
        {
            path: '/404',
            data: Err,
        },
    ];

    route = (event: Event, href?: string) => {
        event.preventDefault();

        if (!href) {
            let block = event.target as HTMLLinkElement;

            if (block.href === undefined && block.parentElement?.matches('a')) {
                block = block.parentElement as HTMLLinkElement;
            }
            href = block.href;
        }

        window.history.pushState({}, '', href);
        this.handleLocation();
    };

    handleLocation = () => {
        const html = !window.location.pathname.includes('product-detail')
            ? this.routes.find((route) => route.path == window.location.pathname) || this.routes[this.routes.length - 1]
            : this.routes.find((route) => route.path == '/product-detail');

        const blockForContent: Element | null = document.getElementById('content');

        if (blockForContent !== null) {
            const page = html?.data as typeof Home | typeof SingleProduct | typeof Products;
            const cl = new page(blockForContent);
            cl.render();
        }

        window.addEventListener('popstate', this.handleLocation);
        window.addEventListener('DOMContentLoaded', this.handleLocation);
    };

    eventListeners() {
        const pagesBlock = document.querySelector('.nav-link');

        pagesBlock?.addEventListener('click', (e) => {
            this.route(e);
        });
    }
}

const server = new Server();
server.handleLocation();
server.eventListeners();

export default server;
