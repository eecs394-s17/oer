import { Component, Inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService]
})
export class EditComponent implements OnInit {
  course: any;
  textbookTitle: string = '';
  textbookLink: string = '';
  textbookDescription: string = '';
  textbookFile: File = null;
  textbookFilePath: any = '';
  storageRef: any;
  editing: string = '';
  textbookUpload: boolean = false;
  textbookLinkChoices: string = '';

  constructor(
    public courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auth: AuthService,
  ) {
    this.course = this.courseService.getCourse();
    console.log(this.course);
  }

  ngOnInit() {
    var subscription = this.auth.user.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
        subscription.unsubscribe();
      } else {
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
    });
  }

  removeTextbook(id) {
    this.courseService.removeTextbookFromCourse(id);
  }

  onSubmitTextbook() {
    if (this.textbookLinkChoices == 'uploadTextbook' && (this.textbookFile == null || this.textbookFile.type != 'application/pdf')) {
      //TODO: Form validation - complain if file isn't a PDF.
      console.log("file is not a pdf. Ignoring submit request.");
    } else {
      this.courseService.addTextbook(this.textbookTitle, this.textbookLink, this.textbookFile, this.textbookDescription, this.textbookLinkChoices);
      this.textbookTitle = '';
      this.textbookLink = '';
      this.textbookFile = null;
      this.textbookFilePath = '';
      this.textbookDescription = '';
    }
  }

  onSubmitEditTextbook(title: string) {
    const key = this.editing;
    this.courseService.editTextbook(key, title);
    this.editing = '';
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
