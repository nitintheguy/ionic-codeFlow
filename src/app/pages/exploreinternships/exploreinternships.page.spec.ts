import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploreinternshipsPage } from './exploreinternships.page';

describe('ExploreinternshipsPage', () => {
  let component: ExploreinternshipsPage;
  let fixture: ComponentFixture<ExploreinternshipsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreinternshipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
