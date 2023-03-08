import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
  
  openModify!: boolean;
  updatePasswordForm!: FormGroup;
  userPasswordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;

  faKey = faKey;

  constructor() {}

  ngOnInit() {
    this.openModify = false;
  }

  onModify() {
    this.openModify = true;
  }

  onSubmit() {
    this.openModify = false;
  }
}
