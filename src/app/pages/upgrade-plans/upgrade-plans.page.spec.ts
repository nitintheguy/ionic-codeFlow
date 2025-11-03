import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpgradePlansPage } from './upgrade-plans.page';

describe('UpgradePlansPage', () => {
  let component: UpgradePlansPage;
  let fixture: ComponentFixture<UpgradePlansPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradePlansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
