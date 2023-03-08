import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lastnameValidator(control: AbstractControl): ValidationErrors | null {
  const lastnameRegExp: RegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;

  if (control.value && !lastnameRegExp.test(control.value)) {
    return { 'invalidLastname': true };
  }
  
  return null;
}