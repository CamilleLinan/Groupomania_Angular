import { Component } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Post } from '../../models/post.modele';
import { TrendingService } from '../../services/trending.service';
import { faHeart, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartBorder } from '@fortawesome/free-regular-svg-icons';
import { UserInfosService } from 'src/app/core/services/user-infos.service';
import { UserInfos } from 'src/app/core/models/user-infos.model';

@Component({
  selector: 'app-trending-list',
  templateUrl: './trending-list.component.html',
  styleUrls: ['./trending-list.component.scss']
})
export class TrendingListComponent {

  posts$!: Observable<Post[]>;
  userId$ = localStorage.getItem('userId');
  userIsLiked!: boolean;
  user$!: UserInfos;
  
  likeIcon = faHeart;
  unlikeIcon = faHeartBorder;
  editIcon = faPenToSquare;
  deleteIcon = faTrash;

  constructor(private userInfosService: UserInfosService,
              private trendingService: TrendingService) {}

  ngOnInit() {
    this.getUserInfos();
    this.trendingService.getPosts();
    this.posts$ = this.trendingService.posts$;
  }

  private getUserInfos(): void {
    this.userInfosService.getUserInfos(this.userId$!).pipe(
      tap(user => {
        this.user$ = user;
      }),
      catchError(error => {
        if (error) {
          console.error(error)
        }
        return of(false)
      })
    ).subscribe();
  }

  onLikePost(post: Post, userId: string, like: number) {
    this.trendingService.likePost(post, userId, like);
    if (post.usersLiked.find(user => user === userId)) {
      post.likes--;
      post.usersLiked = post.usersLiked.filter(user => user !== userId);
      this.userIsLiked = true;
    } else {
      post.likes++;
      post.usersLiked.push(userId);
      this.userIsLiked = false;
    }
  }
}
