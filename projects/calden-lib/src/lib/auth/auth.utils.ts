import { FormGroup, FormControl, ValidatorFn, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const equalValueValidator: ValidatorFn = (fg: FormGroup) => {
  const password = fg.get('password').value;
  const confirmPassword = fg.get('confirmPassword').value;
  return (password !== null) && (confirmPassword !== null) && (password === confirmPassword)
    ? null
    : { passwordsMatch: true };
};

export class EqualPasswordsErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const passordsMatch = !form.hasError('passwordsMatch');
    return !passordsMatch && (control.touched || control.dirty);
  }
}
