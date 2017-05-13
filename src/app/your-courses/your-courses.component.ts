import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CourseService } from '../../services/course.service';

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

@Component({
  selector: 'app-your-courses',
  templateUrl: './your-courses.component.html',
  styleUrls: ['./your-courses.component.css'],
  providers: [UserService]
})
export class YourCoursesComponent implements OnInit {
  mycourses = [];
  prof_id = 2273;
  prof_name = "";

  constructor(private courseService: CourseService, private userService: UserService) {}

  ngOnInit() {
    this.loadUser();
  }

  sendCourse() {
    this.courseService.assignCourse(mockCourse);
  }

  loadUser() {
      this.userService.getUser(this.prof_id).subscribe(data => {
          this.populateList(data);});
  }

  populateList(courses) {
      for(let i in courses){
          console.log(courses[i]);
      }
      this.prof_name = courses[0]['instructor'];
      this.mycourses = courses;
  }

  loadCoursePage(course) {
      console.log(course);
  }
}
