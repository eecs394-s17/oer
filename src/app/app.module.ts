import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { YourCoursesComponent } from './your-courses/your-courses.component';
import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'firebase/storage';
import { environment } from '../environments/environment';

import { CourseService } from '../services/course.service';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

@NgModule({
  declarations: [
    AppComponent,
    YourCoursesComponent,
    LandingComponent,
    SearchComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    Ng2FilterPipeModule,
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
