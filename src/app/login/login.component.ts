import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: any;
  error: any;
  constructor(private http: Http) {
    this.credentials = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  onSubmitLogin() {
    this.http.post('/login', JSON.stringify(this.credentials),
      {headers: new Headers({'Content-Type': 'application/json'})})
    .map(res => {
      this.error = res.headers.get('failure-flash');
      console.log(res);
    }).subscribe();;
  }
}
