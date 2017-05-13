import { Component, OnInit } from '@angular/core';
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

  // TODO: Remove textbooks from course.

  constructor(private courseService: CourseService) {
    this.course = this.courseService.getCourse();
  }

  ngOnInit() {
    console.log(this.course);
  }

  onSubmitTextbook() {
    this.courseService.addTextbook(this.textbookTitle, this.textbookLink);
    this.textbookTitle = '';
    this.textbookLink = '';
  }
}
