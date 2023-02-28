import { Component } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
