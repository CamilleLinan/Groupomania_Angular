import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingRoutingModule } from './trending-routing.module';
import { TrendingListComponent } from './components/trending-list/trending-list.component';
import { TrendingService } from './services/trending.service';
import { CoreModule } from '../core/core.module';
import { NewPostComponent } from './components/new-post/new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TrendingListComponent,
    NewPostComponent
  ],
  imports: [
    CommonModule,
    TrendingRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TrendingListComponent
  ],
  providers: [
    TrendingService
  ]
})
export class TrendingModule { }
