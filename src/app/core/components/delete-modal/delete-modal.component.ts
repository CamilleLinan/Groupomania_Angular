import { Component, Input } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Input() onCancel!: () => void;
  @Input() onDelete!: (postId: string) => void;
  @Input() postId!: string;

  infoIcon = faInfoCircle;
}
