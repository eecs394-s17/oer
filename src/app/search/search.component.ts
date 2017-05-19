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
  equalToProp: Subject<any>;
  orderByChildProp: Subject<any>;
  //search bar input
  stringText: string ='';

  ///selected option
  selectedValue: string = '';
  constructor(db: AngularFireDatabase) {
    this.orderByChildProp = new Subject();
    this.equalToProp = new Subject();

      this.items = db.list('/courses', {
        query: {
          orderByChild: this.orderByChildProp,
          equalTo: this.equalToProp
          
        }
      });
  }
  ngOnInit(){

  }
  searching(){
    console.log('searching');
    console.log(this.stringText);
    console.log(this.selectedValue);
    //this.departmentSubject.next("110-6"); 

    if(this.selectedValue == 'Title') {
      this.orderByChildProp.next('title');
    }
    if(this.selectedValue == 'Courses') {
      this.orderByChildProp.next('catalog_num');
    }
    if(this.selectedValue == 'Professor') {
      this.orderByChildProp.next('instructor');
    }
    this.equalToProp.next(this.stringText); 

  }
  
}
