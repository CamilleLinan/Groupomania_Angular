import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserInfos } from 'src/app/core/models/user-infos.model';
import { UserInfosService } from 'src/app/core/services/user-infos.service';
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

  private initNewPostForm(): void {
    this.messageCtrl = this.formBuilder.control('', Validators.required);
    this.postPictureCtrl = this.formBuilder.control('')

    this.newPostForm = this.formBuilder.group({
      posterId: this.userId,
      message: this.messageCtrl,
      postPicture: this.postPictureCtrl
    })
  }

  getErrorMessage(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis'
    } else {
      return 'Ce champ contient une erreur de format'
    }
  }

  onSubmitNewPostForm() {
    this.trendingService.createNewPost(this.newPostForm.value).pipe(
      tap(saved => {
        if (saved) {
          this.newPostForm.reset();
        } else {
          console.log('Echec')
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
