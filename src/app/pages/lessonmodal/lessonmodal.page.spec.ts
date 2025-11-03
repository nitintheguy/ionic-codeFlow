import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonmodalPage } from './lessonmodal.page';

describe('LessonmodalPage', () => {
  let component: LessonmodalPage;
  let fixture: ComponentFixture<LessonmodalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
