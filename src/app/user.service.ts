import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	constructor (
		private http: Http
		) {}

	getUser() {

		//Http request-
		return this.http.get('http://api.asg.northwestern.edu/courses/?key=qeuayr7d9Bh1L0Jd&term=4660&instructor=516')
		.map((res:Response) => res.json());
	}

}