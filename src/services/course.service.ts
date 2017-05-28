import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Course } from '../classes/course';

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
	private course: Course = new Course();
  public textbooks: any[] = [];
  private textbookIDs: FirebaseListObservable<any>;
  private storageRef;

  constructor(@Inject(FirebaseApp) public firebaseApp: any, private db: AngularFireDatabase) {
    this.storageRef = firebaseApp.storage().ref();
  }

  assignCourse(course: any) {
    this.course.setCourse(course);
    this.textbookIDs = this.db.list('/courses/' + this.course.id + '/textbooks');
    this.textbookIDs.subscribe(ids => {
      console.log("Textbook IDs retrieved...");
      console.log(ids);
      this.textbooks = [];
      if (ids.length > 0) {
        ids.forEach(function(id) {
          var subscription = this.db.object('/textbooks/' + id.$value, { preserveSnapshot: true }).subscribe(snapshot => {
            var textbook = snapshot.val();
            textbook['key'] = id.$key;  // Hold onto key mapping to textbook id in course object
            this.textbooks.push(textbook);
            subscription.unsubscribe();
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
    var textbookRef = this.firebaseApp.database().ref('/courses/' + this.course.id + '/textbooks/' + key);
    textbookRef.once('value').then(function(snapshot) {
      var textbookId = snapshot.val();
      this.db.object('/textbooks/' + textbookId).remove();
      this.db.object('/courses/' + this.course.id + '/textbooks/' + key).remove();
    }.bind(this));
  }

  addTextbook(title: string, link: string, file: File, description: string) {
    if (link != '') {
      this.updateDbNewTextbook(title, link, description);
    } else {  //upload the file
      var fileRef = this.storageRef.child(file.name)
      fileRef.put(file).then(function(snapshot) {
        console.log('Uploaded textbook!');
        fileRef.getDownloadURL().then(function(path) {
          link = path;
          console.log(link);
          this.updateDbNewTextbook(title, link, description);
        }.bind(this));
      }.bind(this));
    }
  }

  private updateDbNewTextbook(title: string, path: string, description: string) {
    var textbook = this.db.list('/textbooks/').push({
      'title': title,
      'link': path,
      'description': description
    });
    this.db.object('/courses/' + this.course.id).update({
      'title': this.course.title,
      'term': this.course.term,
      'instructor': this.course.instructor,
      'subject': this.course.subject,
      'catalog_num': this.course.catalog_num,
      'topic': this.course.topic,

    });
    this.db.list('/courses/' + this.course.id + '/textbooks').push(textbook.key);
  }

  editTextbook(key: string, title: string) {
    console.log(key);
    var textbookRef = this.firebaseApp.database().ref('/courses/' + this.course.id + '/textbooks/' + key);
    textbookRef.once('value').then(function(snapshot) {
      var textbookId = snapshot.val();
      this.db.object('/textbooks/' + textbookId).update({'title': title});
    }.bind(this));
  }
}
