import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

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
	private course: any;
  public textbooks: any[];
  private textbookIDs: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.assignCourse(mockCourse);
  }

  assignCourse(course: any) {
    this.course = course;
    this.textbookIDs = this.db.list('/courses/' + this.course.id + '/textbooks');
    this.textbookIDs.subscribe(ids => {
      console.log(ids);
      this.textbooks = [];
      if (ids.length > 0) {
        ids.forEach(function(id) {
          this.db.object('/textbooks/' + id.$value, { preserveSnapshot: true }).subscribe(snapshot => {
            this.textbooks.push(snapshot.val());
          });
        }, this);
      } else {
        console.log("No entry in database");
      }
    });
  }

  getCourse() {
    return this.course;
  }

  addTextbook(title: string, link: string) {
    var textbook = this.db.list('/textbooks/').push({
      'title': title,
      'link': link
    });
    this.db.list('/courses/' + this.course.id + '/textbooks').push(textbook.key);
  }
}
