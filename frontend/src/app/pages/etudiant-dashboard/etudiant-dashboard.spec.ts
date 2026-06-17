import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEtudiant } from './etudiant-dashboard';

describe('EtudiantDashboard', () => {
  let component: DashboardEtudiant;
  let fixture: ComponentFixture<DashboardEtudiant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEtudiant],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardEtudiant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
