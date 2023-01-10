import { IArrayParams } from "./types";

class QueryParams {
  url: URL;

  constructor() {
    this.url = new URL(window.location.href);
  }

  getQueryParams(param?: string) {

    if (param) {
      return this.url.searchParams.get(param);
    } else {
      const arrParams: IArrayParams[] = [];

      for (const [key, value] of this.url.searchParams.entries()) {
        arrParams.push({
          name: key,
          value: [value].join('').split(';'),
        })
      }

      return arrParams;
    }
  }

  createQueryParams(param: string) {
    const nameParam = param.split('=')[0];
    const keyParam = param.split('=')[1];

    if (window.location.href.includes(keyParam) && nameParam !== 'sort' && nameParam !== 'search' && nameParam !== 'view' && nameParam !== 'limit' && nameParam !== 'page') {
      const params = this.getQueryParams(nameParam) as string;
      const arrParams = params.split(';');
      const index = arrParams.indexOf(keyParam);
      arrParams.splice(index, 1);

      arrParams.length >= 1 ? this.url.searchParams.set(nameParam, arrParams.join(';')) : this.url.searchParams.delete(nameParam);

      return this.url;
    }

    if (this.isIncludeQueryParams(nameParam)) {
      this.url.searchParams.set(nameParam, `${this.getQueryParams(nameParam)};${keyParam}`)
    } else {
      this.url.searchParams.set(nameParam, keyParam)
    }

    return this.url;
    //history.pushState(null, '', this.url);

  }

  isIncludeQueryParams(form: string) {
    const paramsFromURL = new URLSearchParams(window.location.search);

    if (form === 'sort' || form === 'price' || form === 'stock' || form === 'search' || form === 'view' || form === 'limit' || form === 'page') {
      return false;
    }

    return this.url.searchParams.has(form)

    // if (form === 'sort') {
    //     return (paramsFromURL.toString().includes(form)) ? true : false;
    // } else if (paramsFromURL.toString().includes('=')) {
    //     return true;
    // }
  }
}

export default QueryParams;
