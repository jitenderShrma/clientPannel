import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ClientService} from '../../services/client.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  clientId: string;
  client: Client;
  hasBalance:boolean = false;
  showBalanceUpdate:boolean = false;
  constructor(private router:ActivatedRoute, private clientService:ClientService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.clientId = this.router.snapshot.params['id'];
    this.clientService.getClient(this.clientId).subscribe(client => {
      if(client !== null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }
  updateBalance(client){
    this.clientService.updateClient(client);
    this.showBalanceUpdate = false;
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert alert-success',
      timeout: 2000
    });

  }

}
