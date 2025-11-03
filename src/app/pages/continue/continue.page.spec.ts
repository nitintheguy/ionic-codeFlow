import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContinuePage } from './continue.page';

describe('ContinuePage', () => {
  let component: ContinuePage;
  let fixture: ComponentFixture<ContinuePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
