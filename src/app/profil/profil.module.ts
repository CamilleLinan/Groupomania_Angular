import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './components/profil/profil.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpdatePhotoComponent } from './components/update-photo/update-photo.component';
import { UpdateInfosComponent } from './components/update-infos/update-infos.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';


@NgModule({
  declarations: [
    ProfilComponent,
    UpdatePhotoComponent,
    UpdateInfosComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    ProfilComponent
  ]
})
export class ProfilModule { }
