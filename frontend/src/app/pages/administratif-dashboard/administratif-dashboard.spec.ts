import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdministratif } from './administratif-dashboard';

describe('AdministratifDashboard', () => {
  let component: DashboardAdministratif;
  let fixture: ComponentFixture<DashboardAdministratif>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdministratif],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAdministratif);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
