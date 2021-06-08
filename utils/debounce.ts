import { isNumber } from "util";

// from https://davidwalsh.name/javascript-debounce-function

export function debounce(func: Function, wait: number, immediate?: boolean) {
  var timeout: NodeJS.Timeout | undefined;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    if (isNumber(timeout)) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
    return timeout;
  };
}
