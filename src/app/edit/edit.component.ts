import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  course: any;
  dataCourse: FirebaseObjectObservable<any>;
  textbooks: any;
  constructor(private courseService: CourseService) {
    this.course = this.courseService.getCourse();
    this.dataCourse = this.courseService.getDBCourse();
  }

  ngOnInit() {
    console.log(this.course);
    this.dataCourse.subscribe(obj => {
      console.log(obj);
      if (obj.$exists()) {
        this.textbooks = obj.textbooks;
        console.log(this.textbooks);
      } else {
        console.log("No entry in database");
        this.textbooks = [];
      }
    });
  }
}
