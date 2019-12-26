import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = ''
  password: string = '';

  constructor(private authService:AuthService, private flashMessage:FlashMessagesService, private router:Router) { }

  ngOnInit() {
  }
  onRegisterSubmit({value, valid}: {value:{email:string, password:string}, valid:boolean}){
    // if(!valid){
    //   alert('please fill the form correctly.')
    // } else {
      // call login service
      this.authService.onRegister(value.email, value.password)
      .then(() => {
        // redirect to login 
        this.router.navigate(['/login']);
        // show flash message
        this.flashMessage.show('You are successfuly register', {
          cssClass: 'alert-success',
          timeout: 2000
        });
      })
      .catch(error => {
        // show error message
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
      })
    }
  // }
}
