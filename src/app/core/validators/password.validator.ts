import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    
    if (!/^.{4,30}$/.test(control.value)) {
        return { 'minMaxLength': true }
    }

    if (!/(?=.*\d)/.test(control.value)) {
        return { 'requireDigit': true }
    }

    if (!/(?=.*[A-Z])/.test(control.value)) {
        return { 'requireUpper': true }
    }

    if (!/(?=.*[a-z])/.test(control.value)) {
        return { 'requireLower': true }
    }
    
    return null;
  }