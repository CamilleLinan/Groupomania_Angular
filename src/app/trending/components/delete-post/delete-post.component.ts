import { Component, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../models/post.modele';
import { TrendingService } from '../../services/trending.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent {
  
  @Input() post!: Post;
  deleteIcon = faTrash;

  constructor(private trendingService: TrendingService) { }
  
  onDelete(postId: string) {
    this.trendingService.deletePost(postId);
  }
}
