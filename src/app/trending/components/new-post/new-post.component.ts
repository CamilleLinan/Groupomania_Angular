import { Component, Input } from '@angular/core';
import { UserInfos } from 'src/app/core/models/user-infos.model';
import { UserInfosService } from 'src/app/core/services/user-infos.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  @Input() user$!: UserInfos;

  constructor(private userInfosService: UserInfosService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.userInfosService.getUserInfos(userId!).subscribe(
      user => {
        console.log(user);
        this.user$ = user;
      },
      error => {
        console.error(error)
      }
    )
  }
}
