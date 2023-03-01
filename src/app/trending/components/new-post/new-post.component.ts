import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserInfos } from 'src/app/core/models/user-infos.model';
import { UserInfosService } from 'src/app/core/services/user-infos.service';
import { NewPost } from '../../models/new-post.model';
import { TrendingService } from '../../services/trending.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  user$!: UserInfos;
  newPostForm!: FormGroup;
  messageCtrl!: FormControl;
  postPictureCtrl!: FormControl;
  userId = localStorage.getItem('userId');
  errorMessage!: string;
  fileToUpload: File | null = null

  constructor(private userInfosService: UserInfosService,
              private formBuilder: FormBuilder,
              private trendingService: TrendingService) {}

  ngOnInit() {
    this.getUserInfos();
    this.initNewPostForm();
  }
  
  private getUserInfos(): void {
    this.userInfosService.getUserInfos(this.userId!).pipe(
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

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
      return;
    }
      this.fileToUpload = inputElement.files[0];
  }

  private initNewPostForm(): void {
    this.messageCtrl = this.formBuilder.control('', Validators.required);
    this.postPictureCtrl = this.formBuilder.control('');

    this.newPostForm = this.formBuilder.group({
      posterId: this.userId,
      message: this.messageCtrl,
      postPicture: this.postPictureCtrl
    });
  }

  onSubmitNewPostForm() {
    const formData = new FormData();
    formData.append('posterId', this.userId!);
    formData.append('message', this.messageCtrl.value);
    formData.append('image', this.fileToUpload!);
    this.trendingService.createNewPost(formData).pipe(
      tap(saved => {
        if (saved) {
          alert('Votre post va être publié !')
        } else {
          alert('Il y a eu une erreur lors de l\'envoie du post.')
        }
      }),
      catchError(error => {
        if (error) {
          this.errorMessage = 'Une erreur interne est survenue'
        }
        return of(false);
      })
    ).subscribe();
  }
}
