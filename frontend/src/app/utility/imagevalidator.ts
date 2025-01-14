import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value instanceof File) {
      const file = control.value;
      if (file.size > maxSize) {
        return { 'fileSize': { 'requiredSize': maxSize, 'actualSize': file.size } };
      }
    }
    return null;
  };
}
