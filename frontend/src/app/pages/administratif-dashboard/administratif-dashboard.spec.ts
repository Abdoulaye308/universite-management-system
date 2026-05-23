import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratifDashboard } from './administratif-dashboard';

describe('AdministratifDashboard', () => {
  let component: AdministratifDashboard;
  let fixture: ComponentFixture<AdministratifDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministratifDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministratifDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
