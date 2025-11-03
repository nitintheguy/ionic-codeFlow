import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HackathondetailsPage } from './hackathondetails.page';

describe('HackathondetailsPage', () => {
  let component: HackathondetailsPage;
  let fixture: ComponentFixture<HackathondetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathondetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
