import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = afAuth.authState;
  }

  login(res) {
    this.afAuth.auth.signInWithCustomToken(res.token).catch(function(error) {
      // Handle custom token sign-in errors
      var errorMessage = error.message;
      console.log(errorMessage);
    });

    var subscription = this.user.subscribe(user => {
      if (user) {
        if (!user.displayName) {
          console.log("Adding a display name...");
          user.updateProfile({displayName: res.givenName, photoURL: null});
        }
        subscription.unsubscribe();
      } 
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
