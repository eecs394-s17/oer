import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  course: any;
  textbookTitle: string = '';
  textbookLink: string = '';
  textbookFile: File = null;
  storageRef: any;

  constructor(private courseService: CourseService) {
    this.course = this.courseService.getCourse();
  }

  ngOnInit() {
    console.log(this.course);
  }

  removeTextbook(id) {
    this.courseService.removeTextbookFromCourse(id);
  }

  onSubmitTextbook() {
    if (this.textbookLink == '' && (this.textbookFile == null || this.textbookFile.type != 'application/pdf')) {
      //TODO: complain if the file isn't a pdf
      console.log("file is not a pdf. Ignoring submit request.");
    } else {
      this.courseService.addTextbook(this.textbookTitle, this.textbookLink, this.textbookFile);
      this.textbookTitle = '';
      this.textbookLink = '';
      this.textbookFile = null;
    }
  }

  textbookFileChange(e) {
    if (e.target.files.length > 0) {
      console.log("New file selected: ");
      console.log(e.target.files[0]);
      this.textbookFile = e.target.files[0];
    } else {
      this.textbookFile = null;
    }
  }
}
