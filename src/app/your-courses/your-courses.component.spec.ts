import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCoursesComponent } from './your-courses.component';

describe('YourCoursesComponent', () => {
  let component: YourCoursesComponent;
  let fixture: ComponentFixture<YourCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
