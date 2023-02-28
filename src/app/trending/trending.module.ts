import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingRoutingModule } from './trending-routing.module';
import { TrendingListComponent } from './components/trending-list/trending-list.component';
import { TrendingService } from './services/trending.service';


@NgModule({
  declarations: [
    TrendingListComponent
  ],
  imports: [
    CommonModule,
    TrendingRoutingModule
  ],
  exports: [
    TrendingListComponent
  ],
  providers: [
    TrendingService
  ]
})
export class TrendingModule { }
