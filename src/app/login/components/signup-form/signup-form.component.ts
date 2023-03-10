import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { confirmEqualValidator } from '../../../core/validators/confirm.validator';
import { nameValidator } from '../../../core/validators/name.validator';
import { passwordValidator } from '../../../core/validators/password.validator';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;

  signUpForm!: FormGroup;
  lastnameCtrl!: FormControl;
  firstnameCtrl!: FormControl;
  emailCtrl!: FormControl;
  passwordForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;

  namesRegExp!: RegExp;
  passwordRegExp!: RegExp;
  showPassword!: boolean;
  showPasswordError$!: Observable<boolean>;
  errorMessage: string = '';
  submittedSuccessfully = false;
  
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService) {}
  
  ngOnInit(): void {
    this.showPassword = false;
    this.initSignUpForm();
    this.initFormObservables();
  }

  onSeePassword() {
    this.showPassword = true;
  }

  onUnseePassword() {
    this.showPassword = false;
  }
  
  private initSignUpForm(): void {
    this.lastnameCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20), 
      nameValidator
    ]);
    this.firstnameCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20), 
      nameValidator
    ]);
    this.emailCtrl = this.formBuilder.control('', [
      Validators.required, 
      Validators.email
    ]);
    this.passwordCtrl = this.formBuilder.control('', [
      Validators.required,
      passwordValidator
    ]);
    this.confirmPasswordCtrl = this.formBuilder.control('', [
      Validators.required
    ]);
    this.passwordForm = this.formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    })

    this.signUpForm = this.formBuilder.group({
      lastname: this.lastnameCtrl,
      firstname: this.firstnameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl
    })
  }

  getErrorMessages(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('minlength')) {
      return 'Doit contenir minimum 2 caract??res';
    } else if (ctrl.hasError('maxlength')) {
      return 'Doit contenir maximum 20 caract??res';
    } else if (ctrl.hasError('email')) {
      return 'Merci de renseigner une adresse mail valide';
    } else if (ctrl.hasError('invalidName')) {
      return 'Ce champ ne doit contenir ni chiffre, ni caract??re sp??cial';
    } else if (ctrl.hasError('minMaxLength')) {
      return 'Le mot de passe doit contenir entre 8 et 30 caract??res';
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
    this.showPasswordError$ = this.passwordForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
                    this.passwordCtrl.value &&
                    this.confirmPasswordCtrl.value &&
                    this.passwordForm.hasError('confirmEqual')
      )
    )
  }

  onSubmitSignUpForm() {
    this.loginService.createUser(this.signUpForm.value).pipe(
      tap(saved => {
        if (saved) {
          this.submittedSuccessfully = true;
        }
      }),
      catchError(error => {
        if (error === 'unique') {
          this.errorMessage = 'Cette adresse email est d??j?? utilis??e'
        } else {
          this.errorMessage = 'Une erreur interne est survenue'
        }
        return of(false);
      })
    ).subscribe();
  }
}
