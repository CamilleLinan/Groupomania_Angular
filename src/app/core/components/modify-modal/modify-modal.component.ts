import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modify-modal',
  templateUrl: './modify-modal.component.html',
  styleUrls: ['./modify-modal.component.scss']
})
export class ModifyModalComponent {
  @Input() onCancel!: () => void;
  @Input() onModify!: (postId: string) => void;
  @Input() postId!: string;
}
