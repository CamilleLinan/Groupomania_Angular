import { Component } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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
  userId$ = localStorage.getItem('userId');
  faHeart = faHeart;
  faHeartBorder = faHeartBorder;
  likeValue = 1;

  constructor(private trendingService: TrendingService) {}

  ngOnInit() {
    this.trendingService.getPosts();
    this.posts$ = this.trendingService.posts$;
  }

  onLikePost(id: string, userId: string, like: number) {
    this.trendingService.likePost(id, userId, like).pipe(
      tap(() => {
        this.posts$.subscribe(posts => {
          const post = posts.find(p => p._id === id);
          if (post) {
            post.likes += 1;
            console.log(post)
          }
        });
      }),
      map(() => true)
    ).subscribe();
  }
}
