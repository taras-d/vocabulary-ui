import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl,
  ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[notEmpty]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NotEmptyValidatorDirective),
    multi: true
  }]
})
export class NotEmptyValidatorDirective implements Validator {
  @Input()
  set notEmpty(val: any) {
    this._notEmpty = !!(val || val === '');
    if (this._onChange) {
      this._onChange();
    }
  }

  private _notEmpty: boolean;
  private _onChange: Function;

  validate(control: AbstractControl): ValidationErrors {
    return (this._notEmpty && /^\s*$/.test(control.value)) ?
      { notEmpty: true } : null;
  }

  registerOnValidatorChange(fn: Function): void {
    this._onChange = fn;
  }
}
