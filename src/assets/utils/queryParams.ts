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

        // const result: String[] = [];

        // this.url.searchParams.forEach((item) => result.push(item))
        // // for (const [key, value] of paramsFromURL.entries()) {
        // //     console.log(`${key}=${value}`);
        // // }

        // return result.join(';');
    }

    addQueryParams(param: string) {
        const nameParam = param.split('=')[0];
        const keyParam = param.split('=')[1];

        if (this.isIncludeQueryParams(nameParam)) {
            this.url.searchParams.set(nameParam, `${this.getQueryParams(nameParam)};${keyParam}`)
        } else {
            this.url.searchParams.set(nameParam, keyParam)
        }

        history.pushState(null, '', this.url);

    }

    isIncludeQueryParams(form: string) {
        const paramsFromURL = new URLSearchParams(window.location.search);

        if (form === 'sort') {
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
