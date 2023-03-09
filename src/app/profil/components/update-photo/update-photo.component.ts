import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { UserInfos } from 'src/app/core/models/user-infos.model';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.scss']
})
export class UpdatePhotoComponent {

  @Input() user$!: UserInfos;

  openModify!: boolean;
  updatePhotoForm!: FormGroup;
  updatePhotoCtrl!: FormControl;
  errorMessage!: string;
  imagePreviewURL: string | undefined;
  fileToUpload: File | null = null

  editIcon = faPenToSquare;
  validIcon = faCheck;

  constructor(private formBuilder: FormBuilder,
              private profilService: ProfilService) { }

  ngOnInit() {
    this.openModify = false;
    this.initNewPostForm();
  }

  onModify() {
    this.openModify = true;
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
      return;
    }
      this.fileToUpload = inputElement.files[0];
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewURL = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.fileToUpload = file;
  }

  private initNewPostForm(): void {
    this.updatePhotoCtrl = this.formBuilder.control('');

    this.updatePhotoForm = this.formBuilder.group({
      updatePhoto: this.updatePhotoCtrl
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.fileToUpload!);
    this.profilService.updatePhoto(formData)
      .subscribe(() => this.openModify = false);
  }
}
