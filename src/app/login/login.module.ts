import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/login.service';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { LoginRoutingModule } from './login-routing.module';


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
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    UserService
  ]
})
export class LoginModule { }
