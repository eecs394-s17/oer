import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { YourCoursesComponent } from './your-courses/your-courses.component';
import { LandingComponent } from './landing/landing.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';

const appRoutes: Routes = [
  { path: 'your-courses', component: YourCoursesComponent },
  { path: 'your-courses/edit', component: EditComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
