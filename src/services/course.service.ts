import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

// const mockCourse = {
//   "id": 78818,
//   "title": "Music and Mind",
//   "term": "2010 Fall",
//   "instructor": "Richard D Ashley",
//   "subject": "MUS_THRY",
//   "catalog_num": "251-0",
//   "section": "20",
//   "room": "Music Administration Building 229",
//   "meeting_days": "MoWeFr",
//   "start_time": "09:00",
//   "end_time": "09:50",
//   "seats": 20,
//   "topic": null,
//   "component": "LEC",
//   "class_num": 16834,
//   "course_id": 19151
// };

@Injectable()
export class CourseService {
	private course: any = {
    subject: '',
    catalog_num: '',
    title: ''
  };
  public textbooks: any[] = [];
  private textbookIDs: FirebaseListObservable<any>;
  private storageRef;

  constructor(@Inject(FirebaseApp) firebaseApp: any, private db: AngularFireDatabase) {
    this.storageRef = firebaseApp.storage().ref();
  }

  assignCourse(course: any) {
    this.course = course;
    this.textbookIDs = this.db.list('/courses/' + this.course.id + '/textbooks');
    this.textbookIDs.subscribe(ids => {
      console.log("Textbook IDs retrieved...");
      console.log(ids);
      this.textbooks = [];
      if (ids.length > 0) {
        ids.forEach(function(id) {
          this.db.object('/textbooks/' + id.$value, { preserveSnapshot: true }).subscribe(snapshot => {
            var textbook = snapshot.val();
            textbook['key'] = id.$key;  // Hold onto key mapping to textbook id in course object
            this.textbooks.push(textbook);
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

  removeTextbookFromCourse(key: string) {
    this.db.object('/courses/' + this.course.id + '/textbooks/' + key).set(null);
  }

  addTextbook(title: string, link: string, file: File) {
    if (link != '') {
      this.updateDbNewTextbook(title, link);
    } else {  //upload the file
      var fileRef = this.storageRef.child(file.name)
      fileRef.put(file).then(function(snapshot) {
        console.log('Uploaded textbook!');
        fileRef.getDownloadURL().then(function(path) {
          link = path;
          console.log(link);
          this.updateDbNewTextbook(title, link);
        }.bind(this));
      }.bind(this));
    }
  }

  private updateDbNewTextbook(title: string, path: string) {
    var textbook = this.db.list('/textbooks/').push({
      'title': title,
      'link': path
    });
    this.db.object('/courses/' + this.course.id).update({
      'title': this.course.title,
      'term': this.course.term,
      'instructor': this.course.instructor,
      'subject': this.course.subject,
      'catalog_num': this.course.catalog_num
    });
    this.db.list('/courses/' + this.course.id + '/textbooks').push(textbook.key);
  }

}
