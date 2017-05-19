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
  stringText: string ='';
  optionSelected: string = '';
  selectedValue: string = '';

  constructor(db: AngularFireDatabase) {
    this.departmentSubject = new Subject();
    this.items = db.list('/courses', {
      query: {
        orderByChild: 'catalog_num',
        equalTo: this.departmentSubject
        //startAt: this.departmentSubject
      }
    });
  }
  ngOnInit(){

  }
  searching(){
    console.log('searching');
    console.log(this.stringText);
    console.log(this.selectedValue);
    this.departmentSubject.next("110"); 

  }
  
}
