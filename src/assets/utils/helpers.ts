import { data, IDataObj } from './types';

const sort = (data: data, key: keyof IDataObj, option: string) => {
    if (key === 'price') {
        data.sort((a, b): number => {
            const value1 = a[key] as number;
            const value2 = b[key] as number;

            return option === 'low' ? value1 - value2 : value2 - value1;
        });
    }

    if (key === 'name') {
        data.sort((a, b): number => {
            const value1 = a[key] as string;
            const value2 = b[key] as string;

            if (option === 'low') {
                return value1 < value2 ? 1 : -1;
            } else {
                return value1 > value2 ? 1 : -1;
            }
        });
    }

    return data;
};

// const putLocalStorage = (keyName: string, keyValue: string) => {
//     localStorage.setItem(keyName, keyValue);
// };

// const getLocalStorage = (keyName: string) => {
//     const data = localStorage.getItem(keyName);
//     if (data !== null) {
//         return JSON.parse(data);
//     } else {
//         throw new Error('Json is empty');
//     }
// };

const $ = (selector: string) => document.querySelector(selector);

const $All = (selector: string, parent?: Element) =>
    parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector);

export { sort, $, $All };
