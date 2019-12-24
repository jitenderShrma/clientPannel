import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private afsAuth:AngularFireAuth, private router:Router){}
    canActivate():Observable<boolean>{
        return this.afsAuth.authState.pipe(map(auth => {
            if(!auth){
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }));
    }
}