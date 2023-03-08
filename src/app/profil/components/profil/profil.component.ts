import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { UserInfos } from 'src/app/core/models/user-infos.model';
import { UserInfosService } from 'src/app/core/services/user-infos.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  userId = localStorage.getItem('userId');
  user$!: UserInfos;
  
  constructor(private userInfosService: UserInfosService) { }

  ngOnInit() {
    this.getUserInfos();
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
}
