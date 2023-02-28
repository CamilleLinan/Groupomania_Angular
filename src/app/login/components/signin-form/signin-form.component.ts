import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent {
  
  signInForm!: FormGroup;
  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}
  
  ngOnInit(): void {
    this.initSignInForm();
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
        } else {
          console.log('ECHEC')
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
