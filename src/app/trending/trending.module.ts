import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingRoutingModule } from './trending-routing.module';
import { TrendingListComponent } from './components/trending-list/trending-list.component';
import { TrendingService } from './services/trending.service';
import { CoreModule } from '../core/core.module';
import { NewPostComponent } from './components/new-post/new-post.component';


@NgModule({
  declarations: [
    TrendingListComponent,
    NewPostComponent
  ],
  imports: [
    CommonModule,
    TrendingRoutingModule,
    CoreModule
  ],
  exports: [
    TrendingListComponent
  ],
  providers: [
    TrendingService
  ]
})
export class TrendingModule { }
