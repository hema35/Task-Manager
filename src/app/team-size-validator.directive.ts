import { Directive, Input } from '@angular/core';
import { ValidationErrors, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: TeamSizeValidatorDirective, multi:true}]
})
export class TeamSizeValidatorDirective implements Validator {
  constructor() {}
  @Input('appTeamSizeValidator') n: any;

  validate(control: AbstractControl): ValidationErrors | null {
    let currentvalue = control.value;
    let isValid = currentvalue % this.n === 0;

    if (isValid) {
      return null;
    } else {
      return { divisible: { valid: false } };
    }
  }
}
