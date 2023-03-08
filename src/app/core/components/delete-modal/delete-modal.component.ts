import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Input() onCancel!: () => void;
  @Input() onDelete!: (postId: string) => void;
  @Input() postId!: string;
}
