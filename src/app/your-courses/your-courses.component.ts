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
    ngOnInit() {this.loadUser();}
    mycourses = [];
    prof_id = 2273;
    prof_name = "";

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
