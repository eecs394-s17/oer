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
    console.log("Searching for " + this.selectedValue + "s matching " + this.stringText);
    switch (this.selectedValue) {
      case 'Title':
        this.orderByChildProp.next('title');
        break;
      case 'Course':
        this.orderByChildProp.next('catalog_num');
        break;
      case 'Professor':
        this.orderByChildProp.next('instructor');
        break;
    }
    this.equalToProp.next(this.stringText); 
  }
}
