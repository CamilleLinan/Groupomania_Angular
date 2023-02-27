import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  
  signUpForm!: FormGroup;

  onSubmitSignUpForm() {
    throw new Error('Method not implemented.');
  }

  getErrorMessageSignUp(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
