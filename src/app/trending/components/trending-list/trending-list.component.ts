import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Post } from '../../models/post.modele';
import { TrendingService } from '../../services/trending.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartBorder } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-trending-list',
  templateUrl: './trending-list.component.html',
  styleUrls: ['./trending-list.component.scss']
})
export class TrendingListComponent {

  posts$!: Observable<Post[]>
  faHeart = faHeart;
  faHeartBorder = faHeartBorder;

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.trendingService.getPosts();
    this.posts$ = this.trendingService.posts$;
    console.log(this.posts$)
  }
}
