import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternshipdetailsPage } from './internshipdetails.page';

describe('InternshipdetailsPage', () => {
  let component: InternshipdetailsPage;
  let fixture: ComponentFixture<InternshipdetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
