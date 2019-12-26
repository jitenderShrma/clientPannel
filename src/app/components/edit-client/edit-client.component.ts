import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ClientService} from '../../services/client.service';
import {SettingService} from '../../services/settings.service';
import {Client} from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  clientId: string;
  disableBalance:boolean;
  client:Client = {
    firstName: '',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private router:Router,
    private settingService: SettingService
  ) {
    this.clientId = this.route.snapshot.params['id'];
    this.disableBalance = this.settingService.getSettings().disableBalanceOnEdit;
   }

  ngOnInit() {
    this.clientService.getClient(this.clientId).subscribe(client => {
      this.client = client;
    });
  }
  updateClient({value, valid}: {value:Client, valid:boolean}){
    if(!valid){
      this.flashMessage.show('Please fill all the field correctly', {
        cssClass: 'alert-danger',
        timeout: 2000
      })
    } else {
      this.clientService.updateClient({...value, id: this.clientId});
      this.router.navigate(['/']);
      this.flashMessage.show('Client udpate successfuly', {
        cssClass: 'alert-success',
        timeout: 2000
      });
    }
    
  }
}
