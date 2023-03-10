import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent {
  
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;

  signInForm!: FormGroup;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  
  showPassword!: boolean;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}
  
  ngOnInit(): void {
    this.showPassword = false;
    this.initSignInForm();
  }

  onSeePassword() {
    this.showPassword = true;
  }

  onUnseePassword() {
    this.showPassword = false;
  }

  private initSignInForm(): void {
    this.emailCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', Validators.required);

    this.signInForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    })
  }

  getErrorMessages(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else {
      return 'Ce champ contient une erreur de format'
    }
  }

  onSubmitSignInForm() {
    this.authService.login(this.signInForm.value).pipe(
      tap(saved => {
        if (saved) {
          this.router.navigateByUrl('/trending');
        }
      }),
      catchError(error => {
        if (error === 'Unauthorized') {
          this.errorMessage = 'La paire identifiant/mot de passe est incorrecte'
        } else {
          this.errorMessage = 'Une erreur interne est survenue'
        }
        return of(false);
      })
    ).subscribe();
  }
}
