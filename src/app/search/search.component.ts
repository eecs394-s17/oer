import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  departmentSubject: Subject<any>;

  constructor(db: AngularFireDatabase) {
    this.departmentSubject = new Subject();
    this.items = db.list('/courses', {
      query: {
        orderByChild: 'catalog_num',
        equalTo: this.departmentSubject
      }
    });
  }
  ngOnInit(){

  }
  searching(){
    console.log('searching');
    this.departmentSubject.next("110-6"); 
  }
  
}
