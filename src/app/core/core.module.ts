import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserInfosService } from './services/user-infos.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ModifyModalComponent } from './components/modify-modal/modify-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DeleteModalComponent,
    ModifyModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    DeleteModalComponent,
    ModifyModalComponent
  ],
  providers: [
    AuthService,
    UserInfosService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
