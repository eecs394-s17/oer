import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(res) {
    res = res.json();
    this.afAuth.auth.signInWithCustomToken(res.token).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      console.log(errorMessage);
    });
    var subscription = this.user.subscribe(user => {
      if (user && !user.displayName) {
        console.log("Updating display name...");
        user.updateProfile({displayName: res.displayName, photoURL: null});
        subscription.unsubscribe();
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
