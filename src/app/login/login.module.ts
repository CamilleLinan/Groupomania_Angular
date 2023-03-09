import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    LoginComponent,
    SignupFormComponent,
    SigninFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
