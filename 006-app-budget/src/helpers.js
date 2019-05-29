/*eslint no-undef: 0 */

export const enterIsPressed = e => e.keyCode === 13;
export const when = (cond, f) => x => (cond(x) ? f(x) : x);
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
export const getElement = v => document.querySelector(v);
export const getElementAll = v => document.querySelectorAll(v);
