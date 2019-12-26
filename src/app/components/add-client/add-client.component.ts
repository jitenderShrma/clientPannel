import { Component, OnInit, ViewChild } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router } from '@angular/router';

import {Client} from '../../models/Client';
import {ClientService} from '../../services/client.service';
import {SettingService} from '../../services/settings.service';  
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance: 0
  }
  @ViewChild('clientForm', {static:false}) form: any;
  
  disabledBalanceOnSave: boolean;
  constructor(
    private flashMessage:FlashMessagesService,
    private clientService:ClientService,
    private router:Router,
    private settingService: SettingService
    ) {
      this.disabledBalanceOnSave = this.settingService.getSettings().disableBalanceOnSave;
      setTimeout(() => {
        console.log('disabledBalanceOnSave', this.disabledBalanceOnSave)
      }, 2000);
    }

  ngOnInit() {
  }
  onSubmit({value, valid}: {value:Client, valid:boolean}){
    if(this.disabledBalanceOnSave){
      value.balance = 0;
    }
    if(!valid){
      console.log('not valid')
      // show error message
      this.flashMessage.show('Pleas fill all the form correctly', {
        cssClass:'alert-danger',
        timeout: 2000
      });
    } else {
      // add a client
      this.clientService.addClient(value);
      // show message
      this.flashMessage.show('Client added successfuly', {
        cssClass:'alert-success',
        timeout: 2000
      })
      // redirect on dashboard
      this.router.navigate(['/'])
    }
  }
}