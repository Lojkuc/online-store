import { data, IDataObj } from './types';

const sort = (data: data, key1: keyof IDataObj, option: string) => {
    data.sort((a, b): number => {
        const value1 = a[key1] as number;
        const value2 = b[key1] as number;
        return option === 'low' ? value1 - value2 : value2 - value1;
    });
    return data;
};

const $ = (selector: string) => document.querySelector(selector);

const $All = (selector: string, parent?: Element) =>
    parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector);

export { sort, $, $All };
