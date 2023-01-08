import Home from './components/home';
import About from './components/about';
import Products from './components/products';
import SingleProduct from './components/singleProduct';
import Err from './components/error';
import './assets/style/style.scss';
import Cart from './components/cart';

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
    {
      path: '/cart',
      data: Cart,
    },
  ];

  route = (event: Event, href?: URL | string) => {
    event.preventDefault();
    const block = event.target as HTMLLinkElement;

    if (window.location.href === href?.toString()) {
      return;
    }

    href ? window.history.pushState({}, '', href) : window.history.pushState({}, '', block.href);

    if (block.classList.contains('info__buy')) {
      const blockForContent = <HTMLElement>document.getElementById('content');
      const cl = this.routes[5].data as typeof Cart;
      const cart = new cl(blockForContent);
      cart.render();
      cart.openPopup();
      return;
    }

    this.handleLocation();
  };

  handleLocation = () => {
    const html = !window.location.pathname.includes('product-detail')
      ? this.routes.find((route) => route.path == window.location.pathname) || this.routes[4]
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
    const cart = document.querySelector('.card');

    pagesBlock?.addEventListener('click', (e) => {
      this.route(e);
    });
    cart?.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLLinkElement;
      this.route(e, target.href);
    });
  }
}

const server = new Server();
server.handleLocation();
server.eventListeners();

export default server;
