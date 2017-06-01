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
        var subscription = db.object('/textbooks/' + course.$key).subscribe(books => {
          if (books.$exists()) {
            if (course.subject in this.subjects) {
              this.subjects[course.subject].push(new Course(course));
            } else {
              this.subjects[course.subject] = [new Course(course)];
            }
            this.subjectKeys = Object.keys(this.subjects);
          } 
          //else if (course.subject in this.subjects) {
            // delete this.subjects[course.subject];
          // }

          // subscription.unsubscribe();
        });
      }, this);
    });
  }

  ngOnInit(){}

  viewCourse(course) {
    this.courseService.assignCourse(course);
    this.router.navigate(['/view', course.id]);
  }
}
