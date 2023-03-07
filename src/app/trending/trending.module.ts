import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingRoutingModule } from './trending-routing.module';
import { TrendingListComponent } from './components/trending-list/trending-list.component';
import { TrendingService } from './services/trending.service';
import { CoreModule } from '../core/core.module';
import { NewPostComponent } from './components/new-post/new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeletePostComponent } from './components/delete-post/delete-post.component';


@NgModule({
  declarations: [
    TrendingListComponent,
    NewPostComponent,
    DeletePostComponent
  ],
  imports: [
    CommonModule,
    TrendingRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    TrendingListComponent
  ],
  providers: [
    TrendingService
  ]
})
export class TrendingModule { }
