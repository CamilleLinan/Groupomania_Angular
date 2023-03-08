import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.scss']
})
export class UpdatePhotoComponent {

  @Input() userPicture!: string;

  openModify!: boolean;
  updatePhotoForm!: FormGroup;
  userPictureCtrl!: FormControl;

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
