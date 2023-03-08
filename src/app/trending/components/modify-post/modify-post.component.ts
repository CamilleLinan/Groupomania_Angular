import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.modele';
import { faPenToSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { TrendingService } from '../../services/trending.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent {
  
  @Input() post!: Post;
  modifyPostForm!: FormGroup;
  modifyMessageCtrl!: FormControl;
  modifyPostPictureCtrl!: FormControl;
  errorMessage!: string;
  imagePreviewURL: string | undefined;
  fileToUpload: File | null = null

  modifyIcon = faPenToSquare;
  infoIcon = faInfoCircle;
  
  openModal = false;

  constructor(private formBuilder: FormBuilder,
              private trendingService: TrendingService) { }

  ngOnInit(): void {
    this.initNewPostForm();
  }
  
  onClickIcon() {
    this.openModal = true;
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
      return;
    }
      this.fileToUpload = inputElement.files[0];
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewURL = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.fileToUpload = file;
  }

  private initNewPostForm(): void {
    this.modifyMessageCtrl = this.formBuilder.control('', Validators.required);
    this.modifyPostPictureCtrl = this.formBuilder.control('');

    this.modifyPostForm = this.formBuilder.group({
      modifyMessage: this.modifyMessageCtrl,
      modifyPostPicture: this.modifyPostPictureCtrl
    });
  }

  onCancel() {
    this.openModal = false;
  }

  onModify(postId: string) {
    const formData = new FormData();
    formData.append('message', this.modifyMessageCtrl.value);
    formData.append('image', this.fileToUpload!);
    console.log('message', this.modifyMessageCtrl.value, 'image', this.fileToUpload!);
    this.trendingService.modifyPost(postId, formData)
      .subscribe(() => this.onCancel());
  }
}
