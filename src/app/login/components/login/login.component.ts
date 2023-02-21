import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showSignUpForm = true;
  showSignInForm = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmitSignUpForm(form: NgForm): void {
    console.log('SignUp form submitted:', form.value);
  }

  onSubmitSignInForm(form: NgForm): void {
    console.log('SignIn form submitted:', form.value);
  }

  toggleForm(form: string): void {
    if (form === 'signUp') {
      this.showSignUpForm = true;
      this.showSignInForm = false;
    } else {
      this.showSignUpForm = false;
      this.showSignInForm = true;
    }
  }
}
