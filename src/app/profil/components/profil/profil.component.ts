import { Component } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
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

  profilIcon = faAddressCard;
  
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
