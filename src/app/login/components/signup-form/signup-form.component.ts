import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { lastnameValidator } from '../../validators/name.validator';
import { passwordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  
  signUpForm!: FormGroup;
  lastnameCtrl!: FormControl;
  firstnameCtrl!: FormControl;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  namesRegExp!: RegExp;
  passwordRegExp!: RegExp;
  
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService) {}
  
  ngOnInit(): void {
    this.initSignUpForm();
  }
  
  private initSignUpForm(): void {
    this.namesRegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
    this.passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/;

    this.lastnameCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20), 
      lastnameValidator
    ]);
    this.firstnameCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20), 
      lastnameValidator
    ]);
    this.emailCtrl = this.formBuilder.control('', [
      Validators.required, 
      Validators.email
    ]);
    this.passwordCtrl = this.formBuilder.control('', [
      Validators.required,
      passwordValidator
    ]);

    this.signUpForm = this.formBuilder.group({
      lastname: this.lastnameCtrl,
      firstname: this.firstnameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl
    })
  }

  getErrorMessages(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('minlength')) {
      return 'Doit contenir minimum 2 caractères';
    } else if (ctrl.hasError('maxlength')) {
      return 'Doit contenir maximum 20 caractères';
    } else if (ctrl.hasError('email')) {
      return 'Merci de renseigner une adresse mail valide';
    } else if (ctrl.hasError('invalidLastname')) {
      return 'Ce champ ne doit contenir ni chiffre, ni caractère spécial';
    } else if (ctrl.hasError('minMaxLength')) {
      return 'Le mot de passe doit contenir entre 8 et 30 caractères';
    } else if (ctrl.hasError('requireDigit')) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    } else if (ctrl.hasError('requireUpper')) {
      return 'Le mot de passe doit contenir au moins une majuscule';
    } else if (ctrl.hasError('requireLower')) {
      return 'Le mot de passe doit contenir au moins une minuscule';
    } else {
      return 'Ce champ contient une erreur de format'
    }
  }

  onSubmitSignUpForm() {
    console.log(this.signUpForm.value);
  }
}
