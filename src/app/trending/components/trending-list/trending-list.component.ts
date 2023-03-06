import { Component } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Post } from '../../models/post.modele';
import { TrendingService } from '../../services/trending.service';
import { faHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartBorder } from '@fortawesome/free-regular-svg-icons';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-trending-list',
  templateUrl: './trending-list.component.html',
  styleUrls: ['./trending-list.component.scss']
})
export class TrendingListComponent {

  posts$!: Observable<Post[]>;
  userId$ = localStorage.getItem('userId');
  userIsLiked!: boolean;
  
  faHeart = faHeart;
  faHeartBorder = faHeartBorder;

  constructor(private trendingService: TrendingService) {}

  ngOnInit() {
    this.trendingService.getPosts();
    this.posts$ = this.trendingService.posts$;
  }

  onLikePost(post: Post, userId: string, like: number) {
    this.trendingService.likePost(post, userId, like);
    if (post.usersLiked.find(user => user === userId)) {
      // Supprimer son like
      post.likes--;
      post.usersLiked = post.usersLiked.filter(user => user !== userId);
      this.userIsLiked = true;
    } else {
      // Ajouter un like
      post.likes++;
      post.usersLiked.push(userId);
      this.userIsLiked = false;
    }
  }
}
