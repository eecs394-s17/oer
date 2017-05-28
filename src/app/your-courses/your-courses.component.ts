import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-your-courses',
  templateUrl: './your-courses.component.html',
  styleUrls: ['./your-courses.component.css'],
  providers: [UserService]
})
export class YourCoursesComponent implements OnInit {
  courses = [];
  prof_name = ''; // TODO: get prof_name based on login as well

  constructor(
    private courseService: CourseService, 
    private userService: UserService, 
    public auth: AuthService,
    private router: Router,
    private db: AngularFireDatabase
    ) {
  }

  ngOnInit() {
    var subscription = this.auth.user.subscribe(user => {
      if (!user) {
        console.log("Logged out.");
        this.router.navigate(['/login']);
        subscription.unsubscribe();
      } else {
        if (!this.auth.instructorId) {
          var instructorSub = this.db.object('/instructors/' + user.uid + '/instructorId', 
            {preserveSnapshot: true}).subscribe(snapshot => {
              this.auth.instructorId = snapshot.val();
              this.loadCourses();
              instructorSub.unsubscribe();
            });
        } else {
          this.loadCourses();
        }
        this.prof_name = user.displayName;
        console.log(user);
      }
    });
  }

  loadCourses() {
    console.log(this.auth.instructorId);
    this.userService.getUser(this.auth.instructorId).subscribe(courses => {
      if (courses.length > 0) {
        this.courses = courses;
      }
    });
  }

  sendCourse(course) {
    this.courseService.assignCourse(course);
    this.router.navigate(['/your-courses/edit', course.id]);
  }
}
