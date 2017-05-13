import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';

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

@Component({
  selector: 'app-your-courses',
  templateUrl: './your-courses.component.html',
  styleUrls: ['./your-courses.component.css'],
  providers: [UserService]
})
export class YourCoursesComponent implements OnInit {
  courses = [];
  prof_id = 2273; // TODO: get prof_id based on login
  prof_name = ""; // TODO: get prof_name based on login as well

  constructor(private courseService: CourseService, private userService: UserService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.userService.getUser(this.prof_id).subscribe(courses => {
      if (courses.length > 0) {
        this.prof_name = courses[0]['instructor'];
        this.courses = courses;
      }
    });
  }

  sendCourse(course) {
    this.courseService.assignCourse(course);
  }
}