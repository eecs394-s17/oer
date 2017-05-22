import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  coursesQuery: FirebaseListObservable<any[]>;
  //search bar input
  stringText: string ='';
  subjects = {};
  subjectKeys = [];

  ///selected option
  constructor(private db: AngularFireDatabase) {
    this.coursesQuery = db.list('courses/');

    this.coursesQuery.subscribe(courses => {
      this.subjects = {};      
      courses.forEach(function(course) {
        if (course.subject in this.subjects) {
          this.subjects[course.subject].push(course);
        } else {
          this.subjects[course.subject] = [course];
        }
      }, this);
      this.subjectKeys = Object.keys(this.subjects);
    });
  }
  ngOnInit(){

  }
  searching(){
    
  }
}
