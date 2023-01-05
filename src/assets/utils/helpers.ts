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

const addAttribute = (name: string, values: string[], attribute: string) => {
  const asideContainer = $(`.${name}`);

  if (asideContainer !== null) {
    values.forEach((item) => {
      const aim = $(`#${item}`, asideContainer);
      aim?.setAttribute(attribute, attribute);
    });
  }
};

const checkAttribute = (input: HTMLElement) => {
  if (input?.hasAttribute('checked')) {
    input.removeAttribute('checked');
  }
};

const deleteAllAtriutes = () => {
  const inputs = $All('input[type=checkbox]');
  inputs.forEach((item) => {
    if (item.hasAttribute('checked')) {
      item.removeAttribute('checked');
    }
  });
};

const changeTextHTML = (elem: HTMLElement, text: string) => {
  elem.textContent = text;
};

// const chngeSpansSlider = () => {
//     const rangeContainer = $(`.aside__${name}`);
//     if (rangeContainer !== null) {
//         const asideMaxNumber = <HTMLElement>$('.aside__range_max', rangeContainer);
//         const asideMinNumber = <HTMLElement>$('.aside__range_min', rangeContainer);
//         const inputMin = $(`.${name}-min`) as HTMLInputElement;
//         const inputMax = $(`.${name}-max`) as HTMLInputElement;
//     }
//     asideMaxNumber.textContent = inputMax.value;
//     asideMinNumber.textContent = inputMin.value;
//     return;
// }
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

const $ = (selector: string, parent?: Element) =>
  parent ? parent.querySelector(selector) : document.querySelector(selector);

const $All = (selector: string, parent?: Element) =>
  parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector);

export { sort, $, $All, addAttribute, checkAttribute, deleteAllAtriutes, changeTextHTML };
