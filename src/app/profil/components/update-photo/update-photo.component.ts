import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.scss']
})
export class UpdatePhotoComponent {

  @Input() userPicture!: string;

  updatePhotoForm!: FormGroup;
  userPictureCtrl!: FormControl;
}
