import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent {
  
  signInForm!: FormGroup;
  
  getErrorMessageSignIn(arg0: string) {
    throw new Error('Method not implemented.');
  }

  onSubmitSignInForm() {
    throw new Error('Method not implemented.');
  }
}
