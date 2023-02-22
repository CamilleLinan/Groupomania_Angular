import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
    this.signUpForm = this.formBuilder.group({
      lastname: [
        null, [
          Validators.required, 
          Validators.minLength(2), 
          Validators.maxLength(30),
          Validators.pattern(this.namesRegex) 
        ]
      ],
      firstname: [
        null, [
          Validators.required,
          Validators.minLength(2), 
          Validators.maxLength(30),
          Validators.pattern(this.namesRegex) 
        ]
      ],
      email: [
        null, [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        null, [
          Validators.required
        ]
      ]
    }),

    this.signInForm = this.formBuilder.group({
      email: [
        null, [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        null, [
          Validators.required
        ]
      ]
    });
  }

  getErrorMessage(fieldName: string) {
    const field = <AbstractControl>this.signUpForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (field?.hasError('minlength')) {
      return 'Le champ doit contenir au moins 2 caractères';
    }
    if (field?.hasError('maxlength')) {
      return 'Le champ ne doit pas contenir plus de 30 caractères';
    }
    if (field?.hasError('pattern')) {
      return 'Le champ ne doit contenir que des lettres';
    }
    if (field?.hasError('email')) {
      return 'Merci de renseigner une adresse email correct';
    }
    return '';
  }

  onSubmitSignUpForm(): void {
    if (this.signUpForm.invalid) {
      console.log('non')
    } else {
      console.log('SignUp form submitted:', this.signUpForm.value);
    }
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
