import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/signup-form-value.model';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showSignUpForm = true;
  showSignInForm = false;
  inactiveForm: 'signUp' | 'signIn' = 'signIn';
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  namesRegex!: RegExp;
  user: User = {
    lastname: '',
    firstname: '',
    email: '',
    password: '',
  }

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService) {}

  ngOnInit(): void {

  }

  getErrorMessageSignUp(fieldName: string) {
    const field = <AbstractControl>this.signUpForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (field?.hasError('minlength')) {
      return 'Le champ doit contenir au moins 2 caractères';
    }
    return '';
  }

  getErrorMessageSignIn(fieldName: string) {
    const field = <AbstractControl>this.signInForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est requis';
    }
    return '';
  }

  onSubmitSignInForm(): void {
    console.log('SignIn form submitted:', this.signInForm.value);
  }

  toggleForm(form: string): void {
    if (form === 'signUp') {
      this.showSignUpForm = true;
      this.showSignInForm = false;
      this.inactiveForm = 'signIn';
    } else {
      this.showSignUpForm = false;
      this.showSignInForm = true;
      this.inactiveForm = 'signUp';
    }
  }
}
