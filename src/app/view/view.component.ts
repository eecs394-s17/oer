import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [UserService],
})
export class ViewComponent implements OnInit {
  course: any;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.course = this.courseService.getCourse();
    console.log(this.course);
  }

  ngOnInit() {
    if (this.course.title == '') {
      console.log("Calling API to get course data...");
      this.route.params
        .switchMap((params) => this.userService.getCourse(params['id']))
        .subscribe((course) => {
          this.courseService.assignCourse(course[0]);
          this.course = this.courseService.getCourse();
          console.log(this.course);
        });
    }
  }
}
