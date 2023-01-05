import cartPageEmpty from '../assets/pages/cartPageEmpty';
import cartPage from '../assets/pages/cartPage';
class Cart {
    main;
    constructor(main: Element) {
        this.main = main;
    }
    render() {
        if (localStorage.getItem('cart') == '[]') {
            this.main.innerHTML = cartPageEmpty;
        } else {
            this.main.innerHTML = cartPage;
        }
    }
}

export default Cart;
