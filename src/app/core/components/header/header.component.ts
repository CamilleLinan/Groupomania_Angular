import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faHouse = faHouse;
  faUser = faUser
  faLogOut = faRightFromBracket;

  constructor(private authService: AuthService,
              private route: Router) {}

  goToTrending() {
    this.route.navigateByUrl('/trending');
  }
    
  goToProfil() {
    this.route.navigateByUrl('/profil');
  }
  
  logout(): void {
    this.authService.logout();
  }
}
