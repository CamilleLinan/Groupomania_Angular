import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { catchError, of } from 'rxjs';
import { UserInfos } from 'src/app/core/models/user-infos.model';
import { nameValidator } from 'src/app/core/validators/name.validator';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-update-infos',
  templateUrl: './update-infos.component.html',
  styleUrls: ['./update-infos.component.scss']
})
export class UpdateInfosComponent {

  @Input() user$!: UserInfos;

  editIcon = faPenToSquare;
  validIcon = faCheck;

  openModify!: boolean;
  updateInfosForm!: FormGroup;
  updateFirstnameCtrl!: FormControl;
  updateLastnameCtrl!: FormControl;
  updateEmailCtrl!: FormControl;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private profilService: ProfilService) {}

  ngOnInit(): void {
    this.openModify = false;
    this.initInfosForm();
  }

  onModify() {
    this.openModify = true;
  }

  private initInfosForm(): void {
    this.updateFirstnameCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      nameValidator
    ]);
    this.updateLastnameCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      nameValidator
    ]);
    this.updateEmailCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.email
    ]);

    this.updateInfosForm = this.formBuilder.group({
      firstname: this.updateFirstnameCtrl,
      lastname: this.updateLastnameCtrl,
      email: this.updateEmailCtrl
    })
  }

  getErrorMessages(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('minlength')) {
      return 'Doit contenir minimum 2 caractères';
    } else if (ctrl.hasError('maxlength')) {
      return 'Doit contenir maximum 20 caractères';
    } else if (ctrl.hasError('email')) {
      return 'Merci de renseigner une adresse mail valide';
    } else if (ctrl.hasError('invalidName')) {
      return 'Ce champ ne doit contenir ni chiffre, ni caractère spécial';
    } else {
      return 'Ce champ contient une erreur de format'
    }
  }

  onSubmit() {
    this.profilService.updateProfil(this.updateInfosForm.value).pipe(
      catchError(error => {
        if (error) {
          this.errorMessage = 'Une erreur interne est survenue'
        }
        return of(false);
      })
    ).subscribe(() => this.openModify = false);
  }
}
