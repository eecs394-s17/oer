import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

const mockCourse = {
  "id": 78818,
  "title": "Music and Mind",
  "term": "2010 Fall",
  "instructor": "Richard D Ashley",
  "subject": "MUS_THRY",
  "catalog_num": "251-0",
  "section": "20",
  "room": "Music Administration Building 229",
  "meeting_days": "MoWeFr",
  "start_time": "09:00",
  "end_time": "09:50",
  "seats": 20,
  "topic": null,
  "component": "LEC",
  "class_num": 16834,
  "course_id": 19151
};

@Injectable()
export class CourseService {
	private apiCourse: any;
  private dataCourse: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.assignCourse(mockCourse);
  }

  assignCourse(course: any) {
    this.apiCourse = course;
    this.dataCourse = this.db.object('/courses/' + this.apiCourse.id);
  }

  getCourse() {
    return this.apiCourse;
  }

  getDBCourse() {
    // this.dataCourse.subscribe(obj => {
    //   if ((obj.hasOwnProperty('$value') && !obj['$value'])) {
    //     return obj.textbooks;
    //   } else {
    //     return null;
    //   }
    // });
    return this.dataCourse;
  }

  updateTextbooks() {
    throw {name: "UnimplementedError"};
  }
}
