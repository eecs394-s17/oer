import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  courses: FirebaseListObservable<any[]>;
  //search bar input
  stringText: string ='';

  ///selected option
  constructor(private db: AngularFireDatabase) {
    this.courses = db.list('courses/');
  }
  ngOnInit(){

  }
  searching(){
    
  }
}
