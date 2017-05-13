import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  course: Object = {};

  constructor(private courseService: CourseService) {

  }

  ngOnInit() {
    this.course = this.courseService.course;
    console.log(this.course);
  }
}
