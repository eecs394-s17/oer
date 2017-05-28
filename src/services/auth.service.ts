import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  instructorId: any;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(res) {
    res = res.json();
    this.instructorId = res.instructorId;
    this.afAuth.auth.signInWithCustomToken(res.token).catch(function(error) {
      // Handle errors
      var errorMessage = error.message;
      console.log(errorMessage);
    });

    var subscription = this.user.subscribe(user => {
      if (user && !user.displayName) {
        console.log("Updating display name...");
        user.updateProfile({displayName: res.givenName, photoURL: null});
        subscription.unsubscribe();
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getInstructorId() {
    return this.instructorId;
  }
}
