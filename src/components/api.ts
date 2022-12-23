class Api {

    async load() {
        const resp = fetch('https://www.course-api.com/react-store-products')
        const files = (await resp).json();
        return files
    }
}

const api = new Api();

export default api;