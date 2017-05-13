import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-your-courses',
  templateUrl: './your-courses.component.html',
  styleUrls: ['./your-courses.component.css'],
})
export class YourCoursesComponent implements OnInit {
  mockCourse = {
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

  constructor(private courseService: CourseService) {}

  sendCourse() {
    this.courseService.course = this.mockCourse;
  }

  ngOnInit() {
  }

}
