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
import { AngularFireAuthModule } from 'angularfire2/auth';
import 'firebase/storage';
import { environment } from '../environments/environment';

import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    YourCoursesComponent,
    LandingComponent,
    SearchComponent,
    EditComponent,
    ViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    Ng2FilterPipeModule,
  ],
  providers: [CourseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
