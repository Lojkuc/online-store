class Api {
  async load() {
    const resp = fetch('./catalog.json');
    const files = (await resp).json();
    return files;
  }
}

const api = new Api();

export default api;
