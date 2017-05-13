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
    prof_id = 516;
    prof_name = "";

    loadUser() {
        this.userService.getUser(this.prof_id).subscribe(data => {
            this.populateList(data);});
    }

    populateList(courses) {

        var titles = []
        for(let i in courses){
            console.log(courses[i]);
            titles.push(courses[i]['subject'] + " " + courses[i]['catalog_num'])
        }
        this.prof_name = courses[0]['instructor'];
        this.mycourses = courses;
    }

    loadCoursePage(course) {
        console.log(course);
    }
}
