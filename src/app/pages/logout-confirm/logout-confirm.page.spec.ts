import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutConfirmPage } from './logout-confirm.page';

describe('LogoutConfirmPage', () => {
  let component: LogoutConfirmPage;
  let fixture: ComponentFixture<LogoutConfirmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
