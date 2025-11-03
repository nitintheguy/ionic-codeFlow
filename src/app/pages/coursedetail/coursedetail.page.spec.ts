import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursedetailPage } from './coursedetail.page';

describe('CoursedetailPage', () => {
  let component: CoursedetailPage;
  let fixture: ComponentFixture<CoursedetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
