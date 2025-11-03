import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionManagementPage } from './subscription-management.page';

describe('SubscriptionManagementPage', () => {
  let component: SubscriptionManagementPage;
  let fixture: ComponentFixture<SubscriptionManagementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
