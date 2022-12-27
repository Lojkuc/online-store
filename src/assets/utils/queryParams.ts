// import queryParamsList from './consts';

class QueryParams {

    getQueryParams() {
        const paramsFromURL = new URLSearchParams(window.location.search);
        return paramsFromURL.toString();
    }
    addQueryParams(param: string) {
        const paramsFromURL = new URLSearchParams(window.location.search);

        if (this.isIncludeQueryParams(param.split('=')[0])) {
            history.pushState(null, '', `${window.location.pathname}?${param}`);
            return;
        } else {
            const newUrl = `${window.location}?${param}`;
            history.pushState(null, '', newUrl);
        }
    }
    isIncludeQueryParams(form: string) {
        const paramsFromURL = new URLSearchParams(window.location.search);
        return (paramsFromURL.toString().includes(form)) ? true : false;
    }
}

export default QueryParams;
