import { Injectable } from '@angular/core';
import {Setting} from '../models/Setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  settings:Setting = {
    allowRegistration: false,
    disableBalanceOnEdit: true,
    disableBalanceOnSave: false
  }
  constructor() {
    if(JSON.parse(localStorage.getItem('settings')) != null){
      this.settings = JSON.parse(localStorage.getItem('settings'));   
    }
  }
  getSettings(){
    return this.settings;
  }
  saveChanges(settings:Setting){
    this.settings = settings;
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
}
