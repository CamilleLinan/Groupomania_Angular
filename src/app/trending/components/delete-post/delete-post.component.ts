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
  
  openModal = false;
  onCancelFn!: () => void;
  onDeleteFn!: (postId: string) => void;

  constructor(private trendingService: TrendingService) {
    
    this.onCancelFn = () => {
      this.openModal = false;
      console.log('click cancel')
    }

    this.onDeleteFn = (postId: string) => {
      this.trendingService.deletePost(postId);
    }
  }
  
  onClickIcon() {
    this.openModal = true;
  }
}
