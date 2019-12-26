import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {SettingService} from '../../services/settings.service';
import {Setting} from '../../models/Setting';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Setting;
  constructor(private router:Router, private settingService:SettingService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }
  onSettingSubmit(){
    this.settingService.saveChanges(this.settings);
    // redirect to dashboard
    this.router.navigate(['/']);
    // show flash message
    this.flashMessage.show('saved changes successfuly', {
      cssClass: 'alert-success',
      timeout: 2000
    });
  }

}
