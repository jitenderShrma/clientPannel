import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SettingService} from '../services/settings.service';
@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(private router:Router, private settingService:SettingService){}
    canActivate(){
        if(this.settingService.getSettings().allowRegistration){
            return true;
        } else {
            console.log('else of settingService')
            this.router.navigate(['/login']);
            return false;
        }
    }
}