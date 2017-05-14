import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'firebase/storage';
import { environment } from '../environments/environment';

import { RouterModule, Routes } from '@angular/router';
import { YourCoursesComponent } from './your-courses/your-courses.component';
import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';

import { CourseService } from '../services/course.service';

const appRoutes: Routes = [
  { path: 'your-courses', component: YourCoursesComponent },
  { path: 'your-courses/edit', component: EditComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: LandingComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    YourCoursesComponent,
    LandingComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
