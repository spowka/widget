export namespace RegexValidator {
   export const onlyLetters: RegExp = /^[a-zA-Z]+$/g;
   export const email: RegExp = /^([A-Za-z_\-.]|\d)+@([A-Za-z\-]|\d)+(\.[A-Za-z]+)+$/;
   export const name: RegExp =  /^([a-zA-Z]+[-'\ ]?[a-zA-Z]+)+$/;
   export const phone: RegExp = /^\d+$/;
   export const postcode: RegExp = /^(\d|[A-z]| )+$/;
}