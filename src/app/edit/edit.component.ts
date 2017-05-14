import { Component, Inject, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  course: any;
  textbookTitle: string;
  textbookLink: string;
  storageRef: any;

  // TODO: Remove textbooks from course.

  constructor(@Inject(FirebaseApp) firebaseApp: any, private courseService: CourseService) {
    this.course = this.courseService.getCourse();
    this.storageRef = firebaseApp.storage().ref();
  }

  ngOnInit() {
    console.log(this.course);
  }

  removeTextbook(id) {
    this.courseService.removeTextbookFromCourse(id);
  }

  onSubmitTextbook() {
    this.courseService.addTextbook(this.textbookTitle, this.textbookLink);
    this.textbookTitle = '';
    this.textbookLink = '';
  }

  uploadTextbook() {
    console.log("Not implemented");
  }
}
