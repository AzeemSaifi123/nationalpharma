import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noFirstSpaceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && value.startsWith(' ')) {
    return { noFirstSpace: true };
  }
  return null;
}
