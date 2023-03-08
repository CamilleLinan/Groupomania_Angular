import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-infos',
  templateUrl: './update-infos.component.html',
  styleUrls: ['./update-infos.component.scss']
})
export class UpdateInfosComponent {

  @Input() userFirstname!: string;
  @Input() userLastname!: string;
  @Input() userEmail!: string;

  updateInfosForm!: FormGroup;
  userFirstnameCtrl!: FormControl;
  userLastnameCtrl!: FormControl;
  userEmailCtrl!: FormControl;
}
