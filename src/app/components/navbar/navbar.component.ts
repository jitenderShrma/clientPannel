import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {SettingService} from '../../services/settings.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  authUser: string;
  showRegister:boolean;

  constructor(private router: Router, private flashMessage: FlashMessagesService, private authService: AuthService, private settingService:SettingService) { }

  ngOnInit() {
    this.authService.checkLogin().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.authUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingService.getSettings().allowRegistration;
  }
  onLogout() {
    this.authService.onLogout();
    this.isLoggedIn = false;
    this.authUser = '';
    // Redirect
    this.router.navigate(['/login']);
    // show message
    this.flashMessage.show('you are logged out.', {
      cssClass: 'alert-success',
      timeout: 2000
    });
  }

}
