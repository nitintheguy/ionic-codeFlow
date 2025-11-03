import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindhackathonsPage } from './findhackathons.page';

describe('FindhackathonsPage', () => {
  let component: FindhackathonsPage;
  let fixture: ComponentFixture<FindhackathonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FindhackathonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
