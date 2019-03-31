/**
 * Use 'static' functions to assign them to the class and not its 'prototype'
 */
export default class Utils {
    static isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
}