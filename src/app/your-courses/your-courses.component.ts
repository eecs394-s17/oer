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
  adminView = false;
  allProfs: FirebaseListObservable<any>;
  customProfId: any;

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
        this.router.navigate(['/login']);
        subscription.unsubscribe();
      } else {
        var instructorSub = this.db.object('/instructors/' + user.uid + '/instructorId').subscribe(idObj => {
            if (idObj.$exists()) {
              this.loadCourses(idObj.$value, user.displayName);
            } else {
              var adminSub = this.db.object('/admins/' + user.uid).subscribe(adminObj => {
                if (adminObj.$exists()) {
                  this.adminView = true;
                  this.allProfs = this.db.list('/instructors/', {
                    query: {
                      orderByChild: 'name'
                    }
                  });
                } else {
                  this.adminView = false;
                }
                adminSub.unsubscribe();
              });
            }
            instructorSub.unsubscribe();
          });
      }
    });
  }

  loadCourses(instructorId, name) {
    if (instructorId) {
      this.adminView = false;
      var subscription = this.userService.getUser(instructorId).subscribe(courses => {
        console.log(courses);
        if (courses.length > 0) {
          this.prof_name = courses[0].instructor.split(' ')[0];
          this.courses = courses;
        }
        subscription.unsubscribe();
      });
    } else {
      console.log("No instructor ID provided");
    }
  }

  sendCourse(course) {
    this.courseService.assignCourse(course);
    this.router.navigate(['/your-courses/edit', course.id]);
  }

  onSubmitCustomProfId() {
    this.loadCourses(this.customProfId, this.prof_name);
  }
}
