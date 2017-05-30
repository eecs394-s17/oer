import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	constructor (private http: Http) {}

	getUser(id) {
    console.log("Getting courses for instructor ID " + id);
    return this.http.get('/get-courses/?term=4660&instructor=' + id)
      .map((res:Response) => res.json());
	}

  getCourse(id) {
    return this.http.get('/get-courses/?id=' + id)
      .map((res: Response) => res.json());
  }
}