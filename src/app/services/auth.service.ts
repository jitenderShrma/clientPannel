import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private afAuth: AngularFireAuth) {}
  onLogin(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData))
      .catch(error => reject(error));
    });
  }
  checkLogin(){
    return this.afAuth.authState.pipe(map(auth => {
      return auth;
    }));
  }
  onLogout(){
    this.afAuth.auth.signOut();
  }
}
