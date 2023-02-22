import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

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
              private userService: UserService) {}

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

  getErrorMessageSignUp(fieldName: string) {
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

  getErrorMessageSignIn(fieldName: string) {
    const field = <AbstractControl>this.signInForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est requis';
    }
    return '';
  }

  onSubmitSignUpForm(): void {
    const observable: Observable<any> = this.userService.createUser(this.user);
    observable.subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('Request completed');
      }
    );
    console.log('SignUp form submitted:', this.signUpForm.value);
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
