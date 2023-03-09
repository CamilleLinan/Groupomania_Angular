import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faKey, faEye, faEyeSlash, faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { catchError, map, Observable, of } from 'rxjs';
import { confirmEqualValidator } from 'src/app/core/validators/confirm.validator';
import { passwordValidator } from 'src/app/core/validators/password.validator';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
  
  faKey = faKey;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  editIcon = faPenToSquare;
  validIcon = faCheck;
  
  openModify!: boolean;
  showPassword!: boolean;
  updatePasswordForm!: FormGroup;
  updatePasswordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;

  errorMessage: string = '';
  showPasswordError$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
              private profilService: ProfilService) {}

  ngOnInit(): void {
    this.openModify = false;
    this.showPassword = false;
    this.initPasswordForm();
    this.initFormObservables();
  }

  onModify() {
    this.openModify = true;
  }

  onSeePassword() {
    this.showPassword = true;
  }

  onUnseePassword() {
    this.showPassword = false;
  }

  private initPasswordForm(): void {
    this.updatePasswordCtrl = this.formBuilder.control('', [
      passwordValidator
    ]);
    this.confirmPasswordCtrl = this.formBuilder.control('');

    this.updatePasswordForm = this.formBuilder.group({
      password: this.updatePasswordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    })
  }

  getErrorMessages(ctrl: AbstractControl) {
    if (ctrl.hasError('minMaxLength')) {
      return 'Le mot de passe doit contenir entre 8 et 30 caractères';
    } else if (ctrl.hasError('requireDigit')) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    } else if (ctrl.hasError('requireUpper')) {
      return 'Le mot de passe doit contenir au moins une majuscule';
    } else if (ctrl.hasError('requireLower')) {
      return 'Le mot de passe doit contenir au moins une minuscule';
    } else {
      return 'Ce champ contient une erreur de format'
    }
  }

  initFormObservables() {
    this.showPasswordError$ = this.updatePasswordForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
                    this.updatePasswordCtrl.value &&
                    this.confirmPasswordCtrl.value &&
                    this.updatePasswordForm.hasError('confirmEqual')
      )
    )
  }

  onSubmit() {
    this.profilService.updatePassword(this.updatePasswordCtrl.value).pipe(
      catchError(error => {
        if (error) {
          this.errorMessage = 'Une erreur interne est survenue'
        }
        return of(false);
      })
    ).subscribe(() => this.openModify = false);
  }
}
