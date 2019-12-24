import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  constructor(private router:Router, private flashMessage:FlashMessagesService, private authService:AuthService) { }

  ngOnInit() {
    this.authService.checkLogin().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    });
  }
  onLoginSubmit({value, valid}: {value:{email:string, password:string}, valid:boolean}){
    if(!valid){
      alert('please fill form correctly!')
    } else {
      this.authService.onLogin(this.email, this.password)
      .then(userData => {
        // Redirect on dashboard
        this.router.navigate(['/']);
        // Show flash message
        this.flashMessage.show('Login successfuly', {
          cssClass:'alert-success',
          timeout: 2000
        })
      })
      .catch(error => {
        // show error
        this.flashMessage.show(error.message, {
          cssClass:'alert-danger',
          timeout: 2000
        });
      });
    }
  }
}
