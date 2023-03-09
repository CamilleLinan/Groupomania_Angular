import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(control: AbstractControl): ValidationErrors | null {
  const nameRegExp: RegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;

  if (control.value && !nameRegExp.test(control.value)) {
    return { 'invalidName': true };
  }
  
  return null;
}