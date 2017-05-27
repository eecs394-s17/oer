import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../classes/course';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  coursesQuery: FirebaseListObservable<any[]>;
  //search bar input
  query: any = { searchName: null };
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
        var split_term = course.term.split(' ');
        console.log(split_term[1].substring(0,1) + split_term[0].substring(2,4));
        course.abbreviated_term = split_term[1].substring(0,1) + split_term[0].substring(2,4);
        if (course.subject in this.subjects) {
          this.subjects[course.subject].push(new Course(course));
        } else {
          this.subjects[course.subject] = [new Course(course)];
        }
      }, this);
      this.subjectKeys = Object.keys(this.subjects);
      console.log(this.subjects);
    });
  }

  ngOnInit(){}

  viewCourse(course) {
    this.courseService.assignCourse(course);
    this.router.navigate(['/view', course.id]);
  }
}
