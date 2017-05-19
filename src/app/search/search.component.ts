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
  
  //search bar input
  stringText: string ='';

  ///selected option
  selectedValue: string = '';

  constructor(db: AngularFireDatabase) {
    this.departmentSubject = new Subject();
    // console.log(this.selectedValue);
    // if (this.selectedValue == "Title") {
    //   console.log('title selected');
    //   this.items = db.list('/textbooks', {
    //     query: {
    //       orderByChild: 'title',
    //       equalTo: this.departmentSubject
    //       //startAt: this.departmentSubject
    //     }
    //   });
    // }
    // if (this.selectedValue == "Courses") {
    //   console.log("courses selected");
    //   this.items = db.list('/courses', {
    //     query: {
    //       orderByChild: 'catalog_num',
    //       equalTo: this.departmentSubject
    //       //startAt: this.departmentSubject
    //     }
    //   });
    // }
    // if (this.selectedValue == "Professor") {
    //   console.log("professor selected");
    //   this.items = db.list('/courses', {
    //     query: {
    //       orderByChild: 'instructor',
    //       equalTo: this.departmentSubject
    //       //startAt: this.departmentSubject
    //     }
    //   });
    // }
      // this.items = db.list('/courses', {
      //   query: {
      //     orderByChild: 'catalog_num',
      //     equalTo: this.departmentSubject
      //     //startAt: this.departmentSubject
      //   }
      // });
      this.items = db.list('/courses', {
        query: {
          orderByChild: 'title',
          equalTo: this.departmentSubject
          
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
    this.departmentSubject.next(this.stringText); 

  }
  
}
