import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
  
  updatePasswordForm!: FormGroup;
  userPasswordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
}
