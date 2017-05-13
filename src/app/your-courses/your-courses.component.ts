import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-your-courses',
  templateUrl: './your-courses.component.html',
  styleUrls: ['./your-courses.component.css'],
  providers: [UserService]
})
export class YourCoursesComponent implements OnInit {

  constructor(private userService: UserService) {}
  ngOnInit() {

  }
  profile = {};

  loadUser() {
    this.userService.getUser().subscribe(data => this.profile = data);
  }
}
