import { AbstractControl } from '@angular/forms';

export const notEmpty = (control: AbstractControl) => {
  return (!control.value || /^\s+$/.test(control.value)) ? { notEmpty: true } : null;
};
