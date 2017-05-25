import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  coursesQuery: FirebaseListObservable<any[]>;
  //search bar input
  query: string ='';
  subjects = {};
  subjectKeys = [];

  ///selected option
  constructor(
    private db: AngularFireDatabase, 
    private courseService: CourseService,
    private router: Router
  ) {
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
  viewCourse(course) {
    this.courseService.assignCourse(course);
    this.router.navigate(['/view', course.$key]);
  }
}
