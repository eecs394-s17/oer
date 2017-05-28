import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: any;
  error: any;
  constructor(public auth: AuthService, private http: Http, private router: Router) {
    this.credentials = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    var subscription = this.auth.user.subscribe(user => {
      if (user) {
        this.router.navigate(['/your-courses']);
        subscription.unsubscribe();
      }
    });
  }

  onSubmitLogin() {
    this.http.post(
      '/login',
      JSON.stringify(this.credentials),
      {headers: new Headers({'Content-Type': 'application/json'})}
    )
    .map(res => {
      try {
        res = res.json();
        this.error = '';
      } catch (e) {
        this.error = "Error logging in, please try again."
      }
      if (!this.error) {
        this.auth.login(res);
      }
    }).subscribe();
  }
}
